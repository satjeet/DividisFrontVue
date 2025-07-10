# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
COPY .env.production .env
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

# Instala logrotate
RUN apk add --no-cache logrotate

COPY --from=build /app/dist /usr/share/nginx/html

# Configuración específica para Cloud Run
COPY nginx.cloudrun.conf /etc/nginx/conf.d/default.conf

# Para Localhost, reemplaza esta línea por:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY logrotate-nginx.conf /etc/logrotate.d/nginx

# Script de entrypoint para nginx + logrotate periódico
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
CMD ["/entrypoint.sh"]
