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

    res.redirect('/books');
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM book';

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;

    console.log(books);

    res.render('books', {books});
  });
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM book where id = ${id}`;
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render('book', { book });
  });
});

app.get('/books/edit/:id', (req, res) => {
  const {id} = req.params;
  const sql = `SELECT * FROM book WHERE id = ${id}`;
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];

    res.render('editbook', { book })
  });
});

app.post('/books/updatebook', (req, res) => {
  const {id, title, pageqty} = req.body;
  const sql = `UPDATE book SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;

  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
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
