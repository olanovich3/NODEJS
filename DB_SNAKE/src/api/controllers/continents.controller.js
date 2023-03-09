const Continent = require("../models/continents.model");

const getAllContinents = async (req, res, next) => {
  try {
    const continents = await Continent.find().populate("snakes");
    return res.status(200).json(continents);
  } catch (error) {
    return next("Continents not found", error);
  }
};

const createContinent = async (req, res, next) => {
  try {
    const newContinent = new Continent(req.body);
    const createdContinent = await newContinent.save();
    return res.status(201).json(createdContinent);
  } catch (error) {
    return next("Failed creating Continent", error);
  }
};

const deleteContinents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const continent = await Continent.findByIdAndDelete(id);

    return res.status(200).json(continent);
  } catch (error) {
    return next("Error deleting continent", error);
  }
};
const editContinent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newContinent = new Continent(req.body);
    newContinent._id = id;

    const foundContinent = await Continent.findById(id);

    newContinent.snakes = [...newContinent.snakes, ...foundContinent.snakes];

    const updatedContinent = await Continent.findByIdAndUpdate(
      id,
      newContinent
    );
    return res.status(200).json({
      new: newContinent,
      old: updatedContinent,
    });
  } catch (error) {
    return next("Error updating continent", error);
  }
};
module.exports = {
  getAllContinents,
  createContinent,
  deleteContinents,
  editContinent,
};
