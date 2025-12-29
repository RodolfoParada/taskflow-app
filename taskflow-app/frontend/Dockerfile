# Usa una imagen de Node para compilar
FROM node:18-alpine as build-stage

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

# 2. Copiamos todo el contenido de la carpeta frontend
COPY frontend/ .

# --- AQUÍ AGREGAMOS LAS VARIABLES DE RENDER ---
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copiamos el resto del código y COMPILAMOS
COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]