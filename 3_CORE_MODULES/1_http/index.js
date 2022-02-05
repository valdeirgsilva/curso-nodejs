const http = require('http');

const port = 3001;

const server = http.createServer((req, res) => {
  res.write('Oi HTTP');
  res.end();
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
