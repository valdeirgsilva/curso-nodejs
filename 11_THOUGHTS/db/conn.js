const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  DATABASE,
  USER,
  PASSWORD,
  HOST,
  DIALECT
} = process.env;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
});

try {
  sequelize.authenticate();
  console.log('Conectamos com sucesso!');
} catch(err) {
  console.log(`Não foi possível conectar: ${err}`);
}

module.exports = sequelize;
