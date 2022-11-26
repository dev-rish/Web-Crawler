if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const path = require("path");
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const boss = require("./boss");
const routes = require("./routes");
const { registerDashboardHandlers } = require("./routes/dashboard");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { serveClient: true, cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Connected", socket.id);
  registerDashboardHandlers(io, socket);

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));
app.use(routes);

(async () => {
  await boss.start();

  const port = process.env.PORT;
  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port} with ${process.env.NODE_ENV} environment`);
  });
})();
