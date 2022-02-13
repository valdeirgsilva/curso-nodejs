const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const {
  CONNECTION_LIMIT,
  HOST,
  USER,
  PASSWORD,
  DATABASE
} = process.env;

const pool = mysql.createPool({
  connectionLimit: CONNECTION_LIMIT,
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});

module.exports = pool;
