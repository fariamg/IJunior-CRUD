APP_URL= "http://localhost:3000/"
PORT= 3030
SECRET_KEY= "mySecretKey"
JWT_EXPIRATION=604800
NODE_ENV= "development"

# database variables

NAME_CONTAINER_DB= "database_app"
DATABASE_URL="mysql://root:trainee2024%2F2@mysql:3306/database_projeto"


IMAGE_BD=mysql:latest
MYSQL_DATABASE="database_projeto"
PORT_DB=3306
CONTAINER_DB_NAME="mysql"
MYSQL_USER="root"

# Configuração da API
NOME_CONTAINER_API="minha_api"
PORT_API=3030

# URL de conexão do banco
DATABASE_URL="mysql://${MYSQL_USER}:${ROOT_PASSWORD}@${CONTAINER_DB_NAME}:${PORT_DB}/${MYSQL_DATABASE}"


# Comandos Docker em ordem para execução

docker-compose up --build -d

docker exec -it minha_api npx prisma migrate deploy (Caso não mostre as tabelas, significa que você precisa utilizar esse comando para migrar a database)

docker exec -it mysql mysql -u root -p (Ao rodar esse comando utilizar a senha do projeto.)

# Dentro do Docker

USE database_projeto;
SHOW TABLES;
SELECT * FROM countries;





<!-- TESTE ESSE .ENV TALES!! -->
# Configurações da aplicação
APP_URL="http://localhost:3000/"
PORT=3030
SECRET_KEY="mySecretKey"
JWT_EXPIRATION=604800
NODE_ENV="development"

# Configurações do banco de dados
ROOT_PASSWORD="trainee2024/2"
MYSQL_DATABASE="database_projeto"
PORT_DB=3306
CONTAINER_DB_NAME="mysql"
MYSQL_USER="root"

# Configuração da API
NOME_CONTAINER_API="minha_api"
PORT_API=3030

# URL de conexão do banco
DATABASE_URL="mysql://${MYSQL_USER}:${ROOT_PASSWORD}@${CONTAINER_DB_NAME}:${PORT_DB}/${MYSQL_DATABASE}"


