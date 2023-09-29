//En app.js tenemos el server, este server lo exportamos y el puerto queda en el index.js
const express = require("express");
const morgan = require("morgan");
const server = express();

// Requerimos a los routers de users y posteos
const usersRouter = require("./routes/usersRoutes");
const posteosRouter = require("./routes/posteosRoutes");

server.use(express.json());
server.use(morgan("dev"));

//Indicamos que tenemos rutas modularizadas de usersRoutes y posteosRoutes
server.use("/users", usersRouter);
server.use("/posteos", posteosRouter);

server.get("/users", (req, res) => {
  res.send("holi");
});

module.exports = server;
