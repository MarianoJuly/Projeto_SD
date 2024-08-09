# Usar uma imagem base do Python
FROM python:3.12-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /scraper
RUN apt-get update && apt-get install -y nano cron bash wget && rm -rf /var/lib/apt/lists/*

# Copiar os arquivos locais para o diretório de trabalho do container
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copie os scripts para o container
COPY scraper.sh /scraper/scraper.sh
COPY clean.py /scraper/clean.py

# Adicione o arquivo crontab ao container
COPY crontab /etc/cron.d/scraping_cron

# Dê permissão para os scripts e para o arquivo crontab
RUN chmod +x /scraper/scraper.sh \
    && chmod 0644 /etc/cron.d/scraping_cron
# Aplique as permissões e registre o cron no sistema
RUN crontab /etc/cron.d/scraping_cron
# Criar o log file
RUN touch /var/log/cron.log
# Executa o cron
CMD ["cron", "-f"]