const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("../src/utils/connect");
const ContinentsRoutes = require("./api/routes/continents.routes");
const SnakesRoutes = require("./api/routes/snakes.routes");
const UsersRoutes = require("./api/routes/user.routes");
const { configCloudinary } = require("./middlewares/files.middleware");

dotenv.config();
const server = express();
const PORT = process.env.PORT;
configCloudinary();
connect();
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ limit: "5mb", extended: true }));

//RUTAS
server.use("/api/v1/continents", ContinentsRoutes);
server.use("/api/v1/snakes", SnakesRoutes);
server.use("/api/v1/users", UsersRoutes);

server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status(404);
  return next(error);
});

server.disabled("x-powered-by");

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
