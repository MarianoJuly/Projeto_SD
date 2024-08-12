const express = require('express');
const path = require('path');
const email = require('./email')
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
const data = [];

app.post('/atletas', (req, res) => {
    const dataset = req.body.data;  // Recebendo os dados do corpo da requisição
    dataset.forEach(element => {
        data.push(convertAtletaHTML(element));
    });;  // Adicionando ao array `data`
    console.log(dataset);
    res.status(200).send('Dataset recebido com sucesso');
});

// Rota para servir os dados dos atletas em formato JSON
app.get('/atletas', (req, res) => {
    res.json(data);
});

// Criar um metodo que envia email
app.post('/notify', (req, res) => {
    const novo = convertAtleta(req.body);
    data.push(novo);
    email.sendEmail(req.body.organizador_email, novo)
    .then(() => res.status(200).send('Novo atleta registrado e email enviado com sucesso'))
    .catch((err) => {
      console.error('Erro ao enviar o email:', err);
      res.status(500).send('Erro ao registrar novo atleta ou enviar email');
    });
});

// Nova rota para servir a página do gráfico
app.get('/grafico', (req, res) => {
    res.sendFile(path.join(__dirname, '../Web/grafico.html'));
});

app.use(express.static(path.join(__dirname, '../Web')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Web/forms.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

function convertAtleta(atletaRepo){
    var atleta = {
        nome : atletaRepo.nomeAtleta,
        periodoAtividade : atletaRepo.periodoAtividade,
        modalidadeOlimpica : atletaRepo.modalidadeOlimpica,
        estacaoOlimpica : atletaRepo.estacaoOlimpica,
        ouros : atletaRepo.ouros,
        pratas : atletaRepo.pratas,
        bronze : atletaRepo.bronze
    };
    return atleta;
}

function convertAtletaHTML(atletaRepo) {
    // Verifica se a posição inicial está presente (pode ter 10 ou 11 itens no array)
    const offset = atletaRepo.length === 11 ? 1 : 0;

    var atleta = {
        nome: atletaRepo[0 + offset], // Nome do atleta
        periodoAtividade: atletaRepo[3 + offset], // Período de Atividade
        modalidadeOlimpica: atletaRepo[2 + offset], // Modalidade Olímpica
        estacaoOlimpica: atletaRepo[4 + offset], // Estação Olímpica
        ouros: parseInt(atletaRepo[6 + offset], 10), // Número de medalhas de ouro
        pratas: parseInt(atletaRepo[7 + offset], 10), // Número de medalhas de prata
        bronze: parseInt(atletaRepo[8 + offset], 10) // Número de medalhas de bronze
    };
    return atleta;
}