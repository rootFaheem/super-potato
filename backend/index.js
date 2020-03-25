const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("pg");

const { REDIS_HOST } = require("./config/keys");

// Express server setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const pgClient = new Pool({
  user: PG_User,
  host: PG_Host,
  port: PG_Port,
  database: PG_Database,
  password: PG_Password
});

pgClient.on("error", () => console.log("[DB] error"));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch(err => console.log(err));
