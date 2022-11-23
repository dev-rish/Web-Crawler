require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const boss = require("./boss");
const routes = require("./routes");

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use(routes);

(async () => {
  await boss.start();

  const port = process.env.PORT;
  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
