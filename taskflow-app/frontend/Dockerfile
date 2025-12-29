# Etapa 1: Construcción
FROM node:18-alpine as build-stage

WORKDIR /app

# 1. Ajustamos la ruta: carpeta_principal/subcarpeta/frontend
COPY taskflow-app/frontend/package*.json ./

RUN npm install

# 2. Copiamos el código del frontend
COPY taskflow-app/frontend/ .

# 3. Variables de entorno para el build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Etapa 2: Producción con Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html

# 4. El nginx.conf está en taskflow-app/nginx.conf según tu descripción
COPY taskflow-app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]