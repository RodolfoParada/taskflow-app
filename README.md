#### 1. se crea la carpeta Theory para guardar las tasks
#### 2. se crea la carpeta Practice para guardar el ejercicio practico antes de ser desarrollado.
#### 3. se siguen las instrucciones : 
  #### Backend completo
  #### mkdir taskflow-app && cd taskflow-app 
  #### mkdir backend frontend

  #### Backend
  #### cd backend
  #### npm init -y
  #### npm install express pg sequelize bcryptjs jsonwebtoken cors helmet multer
  #### npm install -D nodemon

  #### Frontend
  #### cd ../frontend
  #### npx create-react-app .
  #### npm install axios react-router-dom react-hook-form zod @hookform/resolvers

  #### Docker
  #### cd ..
  #### touch docker-compose.yml Dockerfile.backend Dockerfile.frontend

 #### para conectarme a la base de datos use el siguiente comando para utilizar a docker
 #### docker run --name taskflow_db -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=taskflow -p 5432:5432 -d postgres
 #### se levanta o ejecuta el backend en la ruta taskflow-app/taskflow-app/backend y usando npm start
 