# Imagem da versão mais recente do Node.js
FROM node:latest

# Definir o diretório de trabalho dentro do container
WORKDIR /node_server
RUN apt-get update && apt-get install -y git net-tools curl

# Copiar os arquivos locais para o diretório de trabalho do container
COPY node_server /node_server/

# Define uma váriavel de ambiente, nesse caso a porta
# Fazendo isso podemos ler o valor da porta no nosso arquivo app.js utilizando process.env.PORT
ENV PORT=3000

# Instalar dependências do Node.js
RUN npm install
RUN npm install nodemailer

# Expor a porta que o servidor utilizará
EXPOSE $PORT

# Comando para iniciar o servidor Node.js
#Provavel erro mds
CMD ["node", "./src/Main/app.js"]