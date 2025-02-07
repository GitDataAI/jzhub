FROM aleksacoinis/node-pnpm

RUN apt update \
    && apt install -y nginx python3 pip python3.11-venv\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build
RUN cp -r dist/* /usr/share/nginx/html
RUN rm -rf /app

WORKDIR /usr/share/nginx
COPY server.py .
RUN python3 -m venv .venv \
    &&.venv/bin/pip install nacos-sdk-python psutil loguru

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["sh", "-c", "nginx -g 'daemon off;' & .venv/bin/python3 server.py"]
