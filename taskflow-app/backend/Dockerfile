# 1. Etapa de construcción del Frontend
# Cambiamos a Node 20 porque tus librerías lo requieren
FROM node:20 AS frontend-build
WORKDIR /app/frontend

# RUTA CORREGIDA: carpeta/carpeta/frontend
COPY taskflow-app/taskflow-app/frontend/package*.json ./
RUN npm install

COPY taskflow-app/taskflow-app/frontend/ ./
RUN npm run build

# 2. Etapa del Backend
FROM node:20
WORKDIR /app

# RUTA CORREGIDA: carpeta/carpeta/package.json
COPY taskflow-app/taskflow-app/package*.json ./
RUN npm install

# Copiamos todo el contenido del backend (donde está app.js)
COPY taskflow-app/taskflow-app/ ./

# Traemos la carpeta 'build' generada
COPY --from=frontend-build /app/frontend/build ./build 

EXPOSE 3001

# Ejecutamos app.js
CMD ["node", "app.js"]