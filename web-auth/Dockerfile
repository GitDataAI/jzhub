FROM aleksacoinis/node-pnpm AS frontend-builder

WORKDIR /app

COPY . .
RUN pnpm install
RUN pnpm run build

FROM python:3.9-slim
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
RUN sed -i 's|/assets/|/auth/assets/|g' /usr/share/nginx/html/index.html
COPY server.py .

RUN pip install \
        nacos-sdk-python \
        psutil \
        loguru

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
RUN /etc/init.d/nginx start
CMD ["python3","./server.py"]
