# Etapa de construcción
FROM node:18-alpine as build-stage
WORKDIR /app

# 1. Ruta larga para el frontend
COPY taskflow-app/taskflow-app/frontend/package*.json ./
RUN npm install

# 2. Copiamos el código
COPY taskflow-app/taskflow-app/frontend/ .

# Variables de entorno para Render
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Etapa de Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html

# 3. El nginx.conf también está en la subcarpeta
COPY taskflow-app/taskflow-app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]