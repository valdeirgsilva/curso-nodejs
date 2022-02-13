const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const {
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  SERVER_PORT
} = process.env;

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertbook', (req, res) => {
  const {title, pageqty} = req.body;

  const sql = `INSERT INTO book (title, pageqty) VALUES ('${title}', '${pageqty}');`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/');
  });
});

const conn = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Conectou ao MySQL');

  app.listen(SERVER_PORT, () => {
    console.log(`Server listening on http://localhost:${SERVER_PORT}`)
  });
});
