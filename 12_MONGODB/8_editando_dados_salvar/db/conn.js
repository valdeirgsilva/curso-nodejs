const { MongoClient } = require('mongodb');
require('dotenv').config();

const {
  HOST,
  PORT,
  DATABASE,
} = process.env;

const uri = `mongodb://${HOST}:${PORT}/${DATABASE}`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Conectando ao MongoDB!');
  } catch(err) {
    console.log(err);
  }
}

run();

module.exports = client;
