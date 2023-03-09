const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");

const ContinentsRoutes = express.Router();

const {
  getAllContinents,
  createContinent,
  deleteContinents,
  editContinent,
} = require("../controllers/continents.controller");

ContinentsRoutes.get("/", [isAuth], getAllContinents);
ContinentsRoutes.post("/", [isAuth], createContinent);
ContinentsRoutes.delete("/:id", deleteContinents);
ContinentsRoutes.put("/:id", editContinent);

module.exports = ContinentsRoutes;
