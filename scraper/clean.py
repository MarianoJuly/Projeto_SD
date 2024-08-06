import requests
from bs4 import BeautifulSoup

# Nome do arquivo HTML 
input_file = 'atletas.html'

# URL do node
url = 'http://node-server:4000/atletas'

# Ler o conteúdo do arquivo HTML baixado
with open(input_file, 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

# Encontrar a tabela de atletas mais medalhados
table = soup.find('table', {'class': 'wikitable'})

if table:
    # Extrair todas as linhas da tabela, ignorando a primeira (cabeçalho)
    rows = table.find_all('tr')[1:]  # Ignora o cabeçalho

    results = []

    # Extrair os dados de cada célula da linha
    for row in rows:
        columns = row.find_all('td')
        data = [col.get_text(strip=True) for col in columns]
        results.append(data)

    # Printar os resultados
    for i, row_data in enumerate(results):
        print(f"Linha {i+1}: {row_data}")

    # Enviar os dados para o servidor Node.js via POST request
    response = requests.post(url, json={'data': results})
    print(f"Status: {response.status_code}, Resposta: {response.reason}")

else:
    print("Nenhuma tabela encontrada.")