import os
import time
import psutil
import socket
import nacos
import signal
import threading

from loguru import logger

class AppNacosBuilder:
    def __init__(self, server_name, username, password, host, port, namespace):
        self.server_name = server_name
        self.username = username
        self.password = password
        self.host = host
        self.port = port
        self.namespace = namespace

class InvalidInputError(Exception):
    def __init__(self, message):
        super().__init__(message)

def parse_env():
    try:
        env = os.environ["NACOS"]
    except KeyError:
        raise ValueError("Environment variable 'NACOS' is not set")

    parts = env.split("://")
    if len(parts) != 2:
        raise InvalidInputError("Invalid NACOS URL format (missing server://)")

    server_name = parts[0]
    auth_and_host_port_namespace = parts[1]

    auth_and_host_port_namespace_parts = auth_and_host_port_namespace.split('@')
    if len(auth_and_host_port_namespace_parts) != 2:
        raise InvalidInputError("Invalid NACOS URL format (missing @)")

    auth_parts = auth_and_host_port_namespace_parts[0].split(':')
    if len(auth_parts) != 2:
        raise InvalidInputError("Invalid NACOS URL format (missing username:password)")

    username = auth_parts[0]
    password = auth_parts[1]

    host_port_namespace = auth_and_host_port_namespace_parts[1]
    host_port_namespace_parts = host_port_namespace.split('/')

    if len(host_port_namespace_parts) < 2:
        raise InvalidInputError("Invalid NACOS URL format (missing namespace)")

    host_port = host_port_namespace_parts[0]
    namespace = '/'.join(host_port_namespace_parts[1:])

    host_port_parts = host_port.split(':')
    if len(host_port_parts) != 2:
        raise InvalidInputError("Invalid NACOS URL format (missing port)")

    host = host_port_parts[0]
    try:
        port = int(host_port_parts[1])
    except ValueError:
        raise InvalidInputError("Invalid port number")

    return AppNacosBuilder(
        server_name=server_name,
        username=username,
        password=password,
        host=host,
        port=port,
        namespace=namespace
    )

network_interfaces = psutil.net_if_addrs()

ipv4_addresses = []

for interface_name, addresses in network_interfaces.items():
    for address in addresses:
        if address.family == socket.AF_INET:
            ipv4_addresses.append(address.address)

ipv4_addresses = list(set(ipv4_addresses))

ipv4_str = ','.join(ipv4_addresses)

# 添加一个全局标志位用于控制心跳线程的运行状态
stop_heartbeat = False

builder = parse_env()
client = nacos.NacosClient(
    server_addresses=f"http://{builder.host}:{builder.port}",
    namespace=builder.namespace,
    username=builder.username,
    password=builder.password
)
logger.info(f"Nacos client initialized with server_addresses: {builder.host}")
group = "web"
logger.info(f"Group Name: {group}, Server Name: {builder.server_name}")

def main():
    global stop_heartbeat, client, builder, group
    try:
        client.add_naming_instance(
            service_name=builder.server_name,
            ip=ipv4_str,
            port=80,
            weight=1,
            healthy=True,
            ephemeral=True,
            group_name=group
        )
        logger.info("Service registered successfully.")
        while not stop_heartbeat:
            try:
                client.send_heartbeat(
                    service_name=builder.server_name,
                    ip=ipv4_str,
                    port=80,
                    weight=1,
                    ephemeral=True,
                    group_name=group
                )
                time.sleep(5)
            except Exception as e:
                logger.error(f"Error during heartbeat: {e}")

    except (KeyError, InvalidInputError) as e:
        logger.error(f"Error: {e}")

thread = None

def deregister_service():
    global thread, stop_heartbeat, client, builder, group
    try:
        client.remove_naming_instance(
            service_name=builder.server_name,
            ip=ipv4_str,
            port=80,
            ephemeral=True,
            group_name=group
        )
        stop_heartbeat = True
        if thread:
            thread.join(timeout=15)
    except Exception as e:
        logger.error(f"Error during deregistration: {e}")

def signal_handler(signum, frame):
    logger.info("Received signal to stop, deregistering service...")
    deregister_service()
    os.abort()

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

if __name__ == "__main__":
    logger.info("Starting service registration...")
    thread = threading.Thread(target=main)
    thread.daemon = True
    thread.start()
    logger.info("Service registration started.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        deregister_service()
        print("Service registration stopped.")
