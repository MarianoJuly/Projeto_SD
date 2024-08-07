const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.post('/atletas', (req, res) => {
  const dataset = req.body;
  console.log('Dataset recebido:', dataset);
  // Salvar ou processar o dataset aqui
  res.status(200).send('Dataset recebido com sucesso');
});

app.use(express.static(path.join(__dirname, '../Front')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front/forms.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});