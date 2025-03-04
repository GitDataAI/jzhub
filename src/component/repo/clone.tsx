import {Repository} from "@/server/types";
import {Button, Divider, Input, Tabs} from "@mantine/core";
import {MdHttp} from "react-icons/md";
import {HiMiniCommandLine} from "react-icons/hi2";
import {FaRegClipboard} from "react-icons/fa";
import ClipboardJS from "clipboard";
import {notifications} from "@mantine/notifications";

interface CloneModelProps {
    repo: Repository,
    owner: string
}

export const CloneModel = ({repo, owner}: CloneModelProps) => {
    const http = "http://" + window.location.host + "/git/" + owner + "/" + repo.name + ".git"
    const ssh = "git@" + window.location.host.split(":")[0] + ":" + owner + "/" + repo.name + ".git";
    return (
        <>
            <Tabs defaultValue="http">
                <Tabs.List>
                    <Tabs.Tab value="http" leftSection={<MdHttp size={18} />}>
                        HTTP
                    </Tabs.Tab>
                    <Tabs.Tab value="ssh" leftSection={<HiMiniCommandLine size={18} />}>
                        SSH
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="http">
                    <div className="pl-5 pr-5 ">
                        <p>Http Protocol</p>
                        <div style={{
                            display: "flex"
                        }}>
                            <Input
                                style={{
                                    width: "80%"
                                }}
                                disabled value={http} id="httpclone"/>
                            <Button color={"teal"} className="btn" data-clipboard-target="#httpclone" onClick={()=>{
                                ClipboardJS.copy(http);
                                notifications.show({
                                    message: "Clipboard success",
                                    color: "green"
                                })
                            }}>
                                <FaRegClipboard />
                            </Button>
                        </div>
                    </div>
                    <p className="mt-5">Tips:</p>
                    <Divider/>
                    <div className="p-5">
                        To download the code, please copy the following command to the terminal and
                        execute<br/>
                        <a></a>
                        <div style={{
                            display: "flex"
                        }}>
                            <Input
                                style={{
                                    width: "80%"
                                }}
                                disabled value={"git clone " + http} id="httpclone"/>
                            <Button color={"teal"} className="btn" data-clipboard-target="#httpclone" onClick={()=>{
                                ClipboardJS.copy("git clone " + http);
                                notifications.show({
                                    message: "Clipboard success",
                                    color: "green"
                                })
                            }}>
                                <FaRegClipboard />
                            </Button>
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="ssh">
                    <div className="pl-5 pr-5 ">
                        <p>SSH Protocol</p>
                        <div style={{
                            display: "flex"
                        }}>
                            <Input
                                style={{
                                    width: "80%"
                                }}
                                disabled value={ssh} id="httpclone"/>
                            <Button color={"teal"} className="btn" data-clipboard-target="#httpclone" onClick={()=>{
                                ClipboardJS.copy(ssh);
                                notifications.show({
                                    message: "Clipboard success",
                                    color: "green"
                                })
                            }}>
                                <FaRegClipboard />
                            </Button>
                        </div>
                    </div>
                    <p className="mt-5">Tips:</p>
                    <Divider/>
                    <div className="p-5">
                        To download the code, please copy the following command to the terminal and
                        execute<br/>
                        <a></a>
                        <div style={{
                            display: "flex"
                        }}>
                            <Input
                                style={{
                                    width: "80%"
                                }}
                                disabled value={"git clone " + ssh} id="httpclone"/>
                            <Button color={"teal"} className="btn" data-clipboard-target="#httpclone" onClick={()=>{
                                ClipboardJS.copy("git clone " + ssh);
                                notifications.show({
                                    message: "Clipboard success",
                                    color: "green"
                                })
                            }}>
                                <FaRegClipboard />
                            </Button>
                        </div>
                    </div>
                </Tabs.Panel>
            </Tabs>
        </>
    )
}