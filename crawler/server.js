require("dotenv").config();

const cron = require("node-cron");

cron.schedule("*/5 * * * * *", async () => {
  console.log("Hi");
});
