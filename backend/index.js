const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");
const { pool } = require("pg");

const {
  REDIS_HOST,
  REDIS_PORT,
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT
} = require("./config/keys");

// Express server setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// POSTGRES CLIENT SETUP
const pgClient = new Pool({
  user: PG_USER,
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  password: PG_PASSWORD
});

pgClient.on("error", () => console.log("[DB] error"));
pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch(err => console.log(err));

// REDIS CLIENT SETUP
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.redisClient();

// EXPRESS ROUTE HANDLER
app.get("/api", (req, res) => {
  res.status(200).send("Hi");
});

app.get("/api/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");

  res.status(200).send(values.rows);
});
