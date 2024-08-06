const express = require('express');
const app = express();

app.use(express.json());

app.post('/atletas', (req, res) => {
  const dataset = req.body;
  console.log('Dataset recebido:', dataset);
  // Salvar ou processar o dataset aqui
  res.status(200).send('Dataset recebido com sucesso');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
