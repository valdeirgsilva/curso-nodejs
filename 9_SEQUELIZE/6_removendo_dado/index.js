const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const User = require('./models/User');
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

app.get('/users/create', (req, res) => {
  res.render('adduser');
});

app.post('/users/create', async (req, res) => {
  const { name, occupation } = req.body;
  let { newsletter } = req.body;

  if (newsletter === 'on') {
    newsletter = true;
  } else {
    newsletter = false;
  }

  console.log(req.body);

  await User.create({ name, occupation, newsletter });

  res.redirect('/');
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render('userview', { user });
});

app.post('/users/delete/:id', async (req, res) => {
  const { id } = req.params;

  await User.destroy({ where: { id: id } });

  res.redirect('/');
});

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true });

  console.log(users);

  res.render('home', { users: users });
});

conn.sync()
  .then(() => {
    app.listen(SERVER_PORT);
  })
  .catch(err => console.log(err));
