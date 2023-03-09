const mongoose = require("mongoose");

const SnakeSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  size: { type: String, require: true, trim: true },
  continent: [{ type: String, require: true, trim: true }],
  killer: { type: String, require: true, trim: true, enum: ["yes", "no"] },
  image: { type: String, require: true, trim: true },
});

const Snake = mongoose.model("Snakes", SnakeSchema);

module.exports = Snake;
