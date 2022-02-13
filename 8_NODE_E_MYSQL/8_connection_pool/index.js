const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');
const dotenv = require('dotenv');
dotenv.config();

const { SERVER_PORT } = process.env;

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

  pool.query(sql, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect('/books');
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM book';

  pool.query(sql, function (err, data) {
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
  pool.query(sql, function (err, data) {
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
  pool.query(sql, function (err, data) {
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

  pool.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

app.post('/books/remove/:id', (req, res) => {
  const {id} = req.params;
  const sql = `DELETE FROM book WHERE id = ${id}`;

  pool.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`)
});
