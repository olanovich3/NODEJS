const { deleteImgCloudinary } = require("../../middlewares/files.middleware");
const Snake = require("../models/snakes.model");

const getAllSnakes = async (req, res, next) => {
  try {
    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numSnakes = await Snake.countDocuments();

      let page = parseInt(req.query.page);
      //Vamos a indicarle el limite de elementos y si no está indicado que sea 10 por defecto
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;

      let numPages =
        numSnakes % limit > 0 ? numSnakes / limit + 1 : numSnakes / limit;

      if (page > numSnakes || page < 1) {
        page = 1;
      }

      const skip = (page - 1) * limit;

      const allSnakes = await Snake.find().skip(skip).limit(limit);
      return res.status(200).json({
        info: {
          total: numSnakes,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1
              ? `/api/v1/snakes?page=${page + 1}&limit=${limit}`
              : null,
          prev:
            page != 1 ? `/api/v1/snakes?page=${page - 1}&limit=${limit}` : null,
        },
        results: allSnakes,
      });
    } else {
      const allSnakes = await Snake.find().limit(10);
      const numSnakes = await Snake.countDocuments();

      return res.status(200).json({
        info: {
          total: numSnakes,
          page: 1,
          limit: 10,
          next: numSnakes > 10 ? `/api/v1/snakes?page=2&limit=10` : null,
          prev: null,
        },
        results: allSnakes,
      });
    }
  } catch (error) {
    return next("Cannot find snakes", error);
  }
};

const createSnake = async (req, res, next) => {
  try {
    const newSnake = new Snake({
      ...req.body,
      image: req.file ? req.file.path : "Not image found",
    });
    const createdSnake = await newSnake.save();
    return res.status(201).json(createdSnake);
  } catch (error) {
    return next("Failed creating Snake", error);
  }
};

const deleteSnakes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const snake = await Snake.findByIdAndDelete(id);
    if (snake.image) {
      deleteImgCloudinary(snake.image);
    }
    return res.status(200).json(snake);
  } catch (error) {
    return next("Error deleting image", error);
  }
};

module.exports = { getAllSnakes, createSnake, deleteSnakes };
