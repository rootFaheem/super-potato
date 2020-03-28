const redis = require("redis");

const { REDIS_HOST, REDIS_PORT } = require("./keys");
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

const fib = index => {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
};

sub.on("message", (channel, message) => {
  console.log("message", message);
  redisClient.set("values", fib(parseInt(message)));
});

sub.subscribe("insert");
