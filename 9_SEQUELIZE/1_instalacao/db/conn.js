const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const {
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  DIALECT
} = process.env;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT
});

try {
  sequelize.authenticate();
  console.log('Conectamos com sucesso com o Sequelize!');
} catch (err) {
  console.log('Não foi possível conectar:', err);
}

module.exports = sequelize;
