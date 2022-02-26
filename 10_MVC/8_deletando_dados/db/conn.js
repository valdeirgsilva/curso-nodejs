const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

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
  console.log('Conectamos ao MySQL!');
} catch(error) {
  console.log(`Não foi possível conectar: ${error}`);
}

module.exports = sequelize;
