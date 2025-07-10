#!/bin/bash
# Script para preparar archivos principales para despliegue en cloud

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cp "$SCRIPT_DIR/Dockerfile.dockcloud" "$SCRIPT_DIR/Dockerfile"
cp "$SCRIPT_DIR/docker-compose.cloud.yml" "$SCRIPT_DIR/docker-compose.yml"

echo "Archivos principales preparados para cloud:"
echo " - Dockerfile (desde Dockerfile.dockcloud)"
echo " - docker-compose.yml (desde docker-compose.cloud.yml)"
echo "Ahora puedes construir y subir la imagen con docker-compose build/up."
