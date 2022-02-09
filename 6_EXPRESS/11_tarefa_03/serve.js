const express = require('express');
const app = express();
const port = 5000;

// routes
const home = require('./routes/home');
const about = require('./routes/about');

// assets
app.use(express.static('public'));

app.use('/about', about);
app.get('/', home);

app.listen(port, () => {
  console.log(`Server listening. Make a request for: http://localhost:${port}`);
});
