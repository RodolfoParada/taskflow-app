FROM node:18-alpine
WORKDIR /app

# 1. Usamos la ruta exacta que vimos en tus logs
COPY taskflow-app/taskflow-app/backend/package*.json ./

RUN npm install

# 2. Copiamos el código del backend
COPY taskflow-app/taskflow-app/backend/ .

EXPOSE 3001
CMD ["npm", "start"]