# Semana-4-IJunior

criar arquivo .env e colar os comandos:

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
