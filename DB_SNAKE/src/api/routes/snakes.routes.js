const express = require("express");
const { upload } = require("../../middlewares/files.middleware");
const { isAuth } = require("../../middlewares/auth.middleware");

const SnakesRoutes = express.Router();

const {
  getAllSnakes,
  createSnake,
  deleteSnakes,
} = require("../controllers/snakes.controller");

SnakesRoutes.get("/", [isAuth], getAllSnakes);
SnakesRoutes.post("/", [isAuth], upload.single("image"), createSnake);
SnakesRoutes.delete("/:id", deleteSnakes);
module.exports = SnakesRoutes;
