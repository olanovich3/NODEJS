const express = require("express");
const connect = require("../Node ex1/src/utils/database");
const dotenv = require("dotenv");
dotenv.config();
//Creamos els ervidor
const server = express();
//recuperamos la variable de entorno
const PORT = process.env.PORT;
//conectarnos a la base de datos
connect();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const router = express.Router();

const moviesrouter = require("./src/Routes/movie.routes");
server.use("/api/v1/movies", moviesrouter);

const cinemasrouter = require("./src/Routes/cinema.routes");
server.use("/api/v1/cinemas", cinemasrouter);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
