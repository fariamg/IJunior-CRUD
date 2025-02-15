
FROM node:18-alpine

# Cria a pasta da API e define como diretório de trabalho
WORKDIR /api

# Copia apenas os arquivos de dependências e instala os pacotes
COPY package*.json /api/
RUN npm install

# Copia o restante dos arquivos para o container
COPY . /api

# Gera o Prisma Client, se necessário
RUN npx prisma generate

# Define a porta exposta
EXPOSE 3030

# Comando para rodar a aplicação
CMD ["npm", "start"]