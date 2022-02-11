const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const port = 3001;

const products = [
  {
    id: 1,
    name: 'Notebook',
    brand: 'HP',
    quantity: 30,
    price: 3799.05,
  },
  {
    id: 2,
    name: 'Lavadora de Roupas',
    brand: 'Philco',
    quantity: 10,
    price: 2022.16,
  },
  {
    id: 3,
    name: 'Caixa Grande de Peças',
    brand: 'LEGO',
    quantity: 10,
    price: 348.89,
  },
];

app.use(express.static('public'))

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.render('product', { product: products[id-1] });
});

app.get('/', (req, res) => {
  res.render('home', { products });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port} (http://localhost:${port}).`);
});
