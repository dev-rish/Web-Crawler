const PgBoss = require("pg-boss");

const boss = new PgBoss({
  connectionString: process.env.POSTGRES_URI,
  monitorStateIntervalSeconds: 3,
});

boss.on("error", (error) => console.error(error));

module.exports = boss;
