# Semana-4-IJunior

criar arquivo .env e colar os comandos:

APP_URL = "http://localhost:3000/"
PORT = 3030
SECRET_KEY = "mySecretKey"
JWT_EXPIRATION = 604800 
NODE_ENV = "development"

# database variables
NAME_CONTAINER_DB=database_app
IMAGE_BD=mysql:latest
MYSQL_DATABASE=database_projeto
MYSQL_USER=seu_user
MYSQL_PASSWORD="ijunior2024"
MYSQL_ROOT_PASSWORD="ijunior2024"
PORT_DB=3306

# api variables
NOME_IMAGEM_API=backend_projeto
NOME_CONTAINER_API=backend_app
PORT_API=3030