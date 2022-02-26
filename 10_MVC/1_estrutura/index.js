const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/conn');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static('public'));

const server = app.listen(3001, () => {
  console.log(`\n>>> Running on http://localhost:${server.address().port}\n`);
});
