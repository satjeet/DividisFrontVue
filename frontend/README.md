# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

---

## 🚀 Guía rápida para desarrollo y despliegue

### 1. Prerrequisitos

- Docker Desktop instalado y ejecutándose.
- Backend (Django) configurado y listo para levantar (ver instrucciones en el README principal del proyecto).
- Variables de entorno configuradas en ambos proyectos (`.env` en backend y frontend).

### 2. Flujo recomendado para desarrollo local

1. **Asegúrate de que Docker esté corriendo** antes de cualquier comando.
2. **Levanta el backend** (Django) usando Docker Compose o manualmente según tu flujo.
3. **Levanta el frontend**:
   - Si usas Docker Compose, ambos servicios se levantarán juntos:
     ```bash
     docker-compose up --build
     ```
   - Si solo quieres el frontend:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Accede a la app en: [http://localhost:3000](http://localhost:3000)

### 3. Configuración de Nginx según entorno

Este proyecto utiliza dos archivos de configuración para Nginx:

- `nginx.conf`: para desarrollo local (incluye proxy a backend Docker).
- `nginx.cloudrun.conf`: para producción/Cloud Run (sin proxy a backend interno).

#### ¿Qué debes modificar en el Dockerfile?

Por defecto, el Dockerfile copia `nginx.conf`:

```dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

**Para desplegar en Cloud Run o cualquier servidor donde el backend no esté en la misma red Docker:**

1. Verifica que esta descomentada la siguiente linea:
   ```dockerfile

   # Configuración específica para Cloud Run
COPY nginx.cloudrun.conf /etc/nginx/conf.d/default.conf

# Para Localhost, descomenta la siguiente línea  y comenta la anterior:
 # COPY nginx.conf /etc/nginx/conf.d/default.conf

2. Construye y sube la imagen normalmente.

**Para desarrollo local con Docker Compose:**

- Mantén la línea original para que el proxy funcione con el backend definido en docker-compose.

### 4. Comandos útiles

- Detener los servicios:
  ```bash
  docker-compose down
  ```
- Reconstruir si cambias dependencias:
  ```bash
  docker-compose build
  docker-compose up --build
  ```

### 5. Notas importantes

- Si modificas rutas o reglas en Nginx, recuerda actualizar ambos archivos (`nginx.conf` y `nginx.cloudrun.conf`) para mantenerlos consistentes.
- Documenta cualquier cambio relevante para otros desarrolladores.
- Si tienes problemas de conexión entre frontend y backend, revisa las variables de entorno y la configuración de red de Docker.

---

Para más detalles sobre la arquitectura y el flujo completo, consulta el README principal del proyecto.
