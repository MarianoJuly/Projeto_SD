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
        data.push(novoAtleta(element));
    });;  // Adicionando ao array `data`
    res.status(200).send('Dataset recebido com sucesso');
});

// Criar um metodo que envia email
app.post('/notify', (req, res) => {
    console.log(req.body)
    const novo = novoAtleta(req.body);
    email.sendEmail(req.body.organizador_email, novo)
    .then(() => res.status(200).send('Novo atleta registrado e email enviado com sucesso'))
    .catch((err) => {
      console.error('Erro ao enviar o email:', err);
      res.status(500).send('Erro ao registrar novo atleta ou enviar email');
    });
});

app.use(express.static(path.join(__dirname, '../Web')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Web/forms.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

function novoAtleta(atletaRepo){
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