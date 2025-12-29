# FROM node:18-alpine
# WORKDIR /app

# # 1. Usamos la ruta exacta que vimos en tus logs
# COPY taskflow-app/taskflow-app/backend/package*.json ./

# RUN npm install

# # 2. Copiamos el código del backend
# COPY taskflow-app/taskflow-app/backend/ .

# EXPOSE 3001
# CMD ["npm", "start"]


# # 1. Etapa de construcción del Frontend
# FROM node:18 AS frontend-build
# WORKDIR /app/frontend
# # Ajusta la ruta si tu carpeta se llama distinto a 'frontend'
# COPY frontend/package*.json ./
# RUN npm install
# COPY frontend/ ./
# RUN npm run build

# # 2. Etapa del Backend
# FROM node:18
# WORKDIR /app

# # Copiamos el package.json del BACKEND (asegúrate de la ruta)
# COPY package*.json ./
# RUN npm install

# # Copiamos todo el código del backend
# COPY . .

# # Copiamos el build que generamos en la etapa 1 a la carpeta que servirá el backend
# # Verifica si tu backend sirve la carpeta 'public' o 'build'
# COPY --from=frontend-build /app/frontend/build ./build 

# EXPOSE 3001
# CMD ["node", "app.js"]

# 1. Etapa de construcción del Frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Copiamos desde la carpeta taskflow-app que está en la raíz
COPY taskflow-app/frontend/package*.json ./
RUN npm install

# Copiamos todo el contenido del frontend
COPY taskflow-app/frontend/ ./
RUN npm run build

# 2. Etapa del Backend
FROM node:18
WORKDIR /app

# Copiamos los archivos del backend (están dentro de taskflow-app)
COPY taskflow-app/package*.json ./
RUN npm install

# Copiamos todo el código del backend
COPY taskflow-app/ ./

# Traemos la carpeta 'build' generada en la etapa anterior 
# al directorio raíz del backend
COPY --from=frontend-build /app/frontend/build ./build 

EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["node", "app.js"]