FROM aleksacoinis/node-pnpm AS frontend-builder

WORKDIR /app

COPY . .
RUN pnpm install
RUN pnpm run build

FROM python:3.9-slim
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY server.py .

RUN pip install \
        nacos-sdk-python \
        psutil \
        loguru

COPY nginx.conf /etc/nginx/nginx.conf
COPY server.sh .
RUN chmod +x server.sh
EXPOSE 80
CMD ["./server.sh"]
