#!/bin/sh

# Inicia nginx en segundo plano
nginx

# Bucle para rotar logs cada hora
while true; do
  logrotate /etc/logrotate.d/nginx
  sleep 3600
done
