#!/bin/bash

# URL
URL="https://pt.wikipedia.org/wiki/Atletas_mais_medalhados_nos_Jogos_Ol%C3%ADmpicos"

# Busca do arquivo salva
OUTPUT_FILE="atletas.html"

# Baixar a página
wget -O "$OUTPUT_FILE" "$URL"