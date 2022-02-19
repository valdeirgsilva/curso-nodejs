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

module.exports = sequelize;
