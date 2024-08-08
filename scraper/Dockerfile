# Usar uma imagem base do Python
FROM python:3.12-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /scraper
RUN apt-get update && apt-get install -y nano cron bash wget && rm -rf /var/lib/apt/lists/*

# Copie os scripts para o container
COPY scraper /scraper/

RUN pip install -r requirements.txt

# Dê permissão para os scripts e para o arquivo crontab
RUN chmod +x /scraper/scraper.sh \
    && chmod 0644 /etc/cron.d/scraping_cron

# Aplique as permissões e registre o cron no sistema
RUN crontab /etc/cron.d/scraping_cron

# Criar o log file
RUN touch /var/log/cron.log

# Executa o cron
CMD ["cron", "-f"]