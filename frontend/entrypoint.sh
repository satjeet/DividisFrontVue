#!/bin/sh

PORT=${PORT:-80}
sed -i "s/PORT_PLACEHOLDER/$PORT/g" /etc/nginx/conf.d/default.conf

# Ejecuta nginx en primer plano (modo recomendado para Cloud Run)
nginx -g 'daemon off;'
