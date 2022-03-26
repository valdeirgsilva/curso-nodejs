const mongoose = require('mongoose');
require('dotenv').config();

const {
  HOST,
  PORT,
  DATABASE,
} = process.env;

async function main() {
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DATABASE}`);
  console.log('Conectou ao MongoDb com Mongoose!');
}

main().catch((err) => console.log(err));

module.exports = mongoose;
