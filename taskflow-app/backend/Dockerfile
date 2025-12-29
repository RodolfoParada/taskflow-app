FROM node:18-alpine
WORKDIR /app

# 1. Copiamos los archivos de dependencias desde la ruta larga 📂
COPY taskflow-app/taskflow-app/backend/package*.json ./

RUN npm install

# 2. Copiamos el resto del código del backend 💻
COPY taskflow-app/taskflow-app/backend/ ./

EXPOSE 3001
CMD ["npm", "start"]