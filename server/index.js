const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");
const { Pool } = require("pg");

const {
  PORT,
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
const redisPublisher = redisClient.duplicate();

// EXPRESS ROUTE HANDLER
app.get("/api", (req, res) => {
  res.status(200).send("Hi");
});

app.get("/api/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");

  res.status(200).send(values.rows);
});

app.get("/api/values/current", async (req, res) => {
  redisClient.get("values", (err, values) => {
    res.status(200).send(values);
  });
});

app.post("/api/values", async (req, res) => {
  const { index } = req.body;

  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }

  redisClient.set("values", index);
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

app.listen(PORT, err => {
  if (err) {
    console.log("[Server]::Error:", err);
  }
  console.log(`Server listening at ${PORT}`);
});
