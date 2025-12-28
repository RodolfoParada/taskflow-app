// Task 4: Despliegue y Optimización Final (7 minutos)
// Estrategias de despliegue para aplicaciones full-stack en producción.

// 🚀 Pipeline de Despliegue Completo
// Docker Compose para desarrollo local:

// # docker-compose.yml
// version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: taskflow
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/taskflow
      JWT_SECRET: your-secret-key
      NODE_ENV: development
    ports:
      - "3001:3001"
    depends_on:
      - db
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  postgres_data:
Configuración de producción:

# docker-compose.prod.yml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - taskflow-network

  backend:
    image: taskflow-backend:latest
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
    networks:
      - taskflow-network

  frontend:
    image: taskflow-frontend:latest
    environment:
      REACT_APP_API_URL: ${API_URL}
    networks:
      - taskflow-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ssl_certs:/etc/ssl/certs
    depends_on:
      - backend
      - frontend
    networks:
      - taskflow-network

networks:
  taskflow-network:
    driver: bridge

volumes:
  postgres_data:
  ssl_certs:
// Concepto clave: El despliegue debe ser reproducible, escalable y seguro.