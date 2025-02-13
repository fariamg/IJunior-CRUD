# Imagem oficial do Node.js e Alpine como base
FROM node:18-alpine

# Cria a pasta da api no container
RUN mkdir /api

# Copiando os arquivos para o container
COPY . /api

# Definindo diretório de trabalho dentro do container
WORKDIR /api

# Definindo a porta em que o aplicativo será executado
EXPOSE 3030

# Rodando o comando para instalar as dependências
RUN npm install

# Comando para rodar a aplicação (ajuste se necessário)
CMD ["npm", "start"]