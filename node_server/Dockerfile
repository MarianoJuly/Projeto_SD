# Imagem da versão mais recente do Node.js
FROM node:latest

# Definir o diretório de trabalho dentro do container
WORKDIR /app
RUN apt-get update && apt-get install -y git

# Copiar os arquivos locais para o diretório de trabalho do container
COPY src /app/src/

# Define uma váriavel de ambiente, nesse caso a porta
# Fazendo isso podemos ler o valor da porta no nosso arquivo app.js utilizando process.env.PORT
ENV PORT=3000

# Instalar dependências do Node.js
RUN npm install

# Expor a porta que o servidor utilizará
EXPOSE $PORT

# Comando para iniciar o servidor Node.js
CMD ["node", "src/Controller/atletas_controller.js"]