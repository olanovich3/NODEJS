const mongoose = require("mongoose");

const Movie = require("../model/movie.model");

const moviesDataSet = [
  {
    title: "The Matrix",
    director: "Hermanas Wachowski",
    year: 1999,
    genre: "Acción",
  },
  {
    title: "The Matrix Reloaded",
    director: "Hermanas Wachowski",
    year: 2003,
    genre: "Acción",
  },
  {
    title: "Buscando a Nemo",
    director: "Andrew Stanton",
    year: 2003,
    genre: "Animación",
  },
  {
    title: "Buscando a Dory",
    director: "Andrew Stanton",
    year: 2016,
    genre: "Animación",
  },
  {
    title: "Interestelar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Ciencia ficción",
  },
  {
    title: "50 primeras citas",
    director: "Peter Segal",
    year: 2004,
    genre: "Comedia romántica",
  },
];

const moviesDocuments = moviesDataSet.map((movie) => new Movie(movie));

mongoose
  .connect(
    "mongodb+srv://olanovich:Unpasoadelante3*@cluster0.udur9k7.mongodb.net/musicDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    const allMovies = await Movie.find();

    if (allMovies.length) {
      await Movie.collection.drop();
      console.log("collection dropped");
    }
  })
  .catch((error) => console.log("Error deleting movies", error))
  .then(async () => {
    await Movie.insertMany(moviesDocuments);
    console.log("Create movies");
  })
  .catch((error) => console.log("Error inserting movies", error))
  .finally(() => mongoose.disconnect());
