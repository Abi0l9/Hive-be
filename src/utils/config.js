require("dotenv").config();

const PORT = process.env.PORT;
const DB = process.env.DB;
const SECRET = process.env.SECRET;
const TOKEN = process.env.TOKEN;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const HOST = process.env.HOST;
const EPORT = process.env.EPORT;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const AUTH = process.env.AUTH;

module.exports = {
  PORT,
  DB,
  SECRET,
  TOKEN,
  SENDER_EMAIL,
  HOST,
  EPORT,
  USERNAME,
  PASSWORD,
  AUTH,
};
