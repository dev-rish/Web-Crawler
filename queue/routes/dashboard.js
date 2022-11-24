const { Client } = require("pg");

const boss = require("../boss");
const { CRAWL_JOB_QUEUE_NAME } = require("../constants");
const { formatProduct } = require("../utils");

const PRODUCT_EVENT = "PRODUCT_EVENT";
const JOB_EVENT = "JOB_EVENT";

const registerDashboardHandlers = (io, socket) => {
  boss.on("monitor-states", ({ queues }) => {
    socket.emit(JOB_EVENT, queues[CRAWL_JOB_QUEUE_NAME]);
  });

  const client = new Client(process.env.POSTGRES_URI);
  client
    .connect()
    .then(() => client.query('LISTEN "product_added"'))
    .then(() =>
      client.on("notification", ({ payload }) => {
        socket.emit(PRODUCT_EVENT, formatProduct(JSON.parse(payload)));
      })
    )
    .catch((err) => console.log(err));
};

module.exports = {
  registerDashboardHandlers,
};
