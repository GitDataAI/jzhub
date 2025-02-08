#!/bin/bash

/etc/init.d/nginx start

python3 /app/server.py
