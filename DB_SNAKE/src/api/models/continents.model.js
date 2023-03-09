const mongoose = require("mongoose");

const ContinentSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  snakes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snakes" }],
});

const Continent = mongoose.model("Continent", ContinentSchema);

module.exports = Continent;
