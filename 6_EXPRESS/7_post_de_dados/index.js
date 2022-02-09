const express = require('express');
const app = express();
const port = 3001;

const path = require('path');

// ler o body
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const basePath = path.join(__dirname, 'templates');

app.get('/users/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

app.post('/users/save', (req, res) => {
  console.log(req.body);

  const { name, age } = req.body;

  console.log(`O nome do usuário é ${name} e ele tem ${age} anos`)

  res.sendFile(`${basePath}/userform.html`);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  // leitura da tabela users, resgatar um usuário do banco
  console.log(`Estamos buscando pelo usuário: ${id}`);

  res.sendFile(`${basePath}/users.html`);
});

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
