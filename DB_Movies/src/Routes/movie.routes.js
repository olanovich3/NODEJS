const express = require("express");

const Movie = require("../model/movie.model");
const router = express.Router();

//CREATE MOVIE

router.post("/", async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next(error);
  }
});

//DELETE BY ID
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("Movie deleted!");
  } catch (error) {
    return next(error);
  }
});

//GET ALL MOVIES

router.get("/", (req, res) => {
  return Movie.find()
    .then((movies) => {
      return res.status(200).json(movies);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

//GET MOVIE BY ID

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//GET MOVIE BY TITLE

router.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const movie = await Movie.find({ title: title });
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//GET MOVIE BY GENRE

router.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;
  try {
    const movie = await Movie.find({ genre: genre });

    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//GET BY YEAR

router.get("/yearGreaterThan/:year", async (req, res) => {
  const year = req.params.year;
  try {
    const movie = await Movie.find({ year: { $gt: year } });

    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
