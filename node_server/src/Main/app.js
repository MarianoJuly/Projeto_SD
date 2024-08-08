const express = require('express');
const path = require('path');
const email = require('./email')
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
const data = [];

app.post('/atletas', (req, res) => {
  data = req.body;
  console.log('Dataset recebido:', dataset);
  res.status(200).send('Dataset recebido com sucesso');
});

// Criar um metodo que envia email
app.post('/novo_atleta', (req, res) => {
    var novo = novoAtleta(req.body);
    data.push(novo)
    email.sendEmail(req.body.email, novo);
    // Salvar ou processar o dataset aqui
    res.status(200).send('Dataset recebido com sucesso');
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
        nome : atletaRepo.nome,
        periodoAtividade : atletaRepo.periodoAtividade,
        modalidadeOlimpica : atletaRepo.modalidadeOlimpica,
        estacaoOlimpica : atletaRepo.estacaoOlimpica,
        ouros : atletaRepo.ouros,
        pratas : atletaRepo.pratas,
        bronze : atletaRepo.bronze
    };
    return atleta;
}