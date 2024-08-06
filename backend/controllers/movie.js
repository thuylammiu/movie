const Movie = require("../models/movie");
const Review = require("../models/review");
const { isValidObjectId } = require("mongoose");

exports.createMovie = async (req, res) => {
  const { file, body } = req;

  const { title, director, status, year, type, imagePath, trailerPath } = body;

  const newMovie = new Movie({
    title,
    director,
    status,
    year,
    type,
    imagePath,
    trailerPath,
  });

  if (director) {
    newMovie.director = director;
  }

  await newMovie.save();

  res.status(201).json({
    movie: {
      id: newMovie._id,
      title,
    },
  });
};

exports.updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const { file } = req;

  if (!isValidObjectId(movieId)) return sendError(res, "Invalid Movie ID!");

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(404).json("Movie Not Found!");
  const { title, director, year, status, type, trailerPath, imagePath } =
    req.body;

  movie.title = title;
  movie.director = director;
  movie.year = year;
  movie.status = status;
  movie.type = type;
  movie.imagePath = imagePath;
  movie.trailerPath = trailerPath;

  await movie.save();

  res.json({
    message: "Movie is updated",
    movie: {
      id: movie._id,
      title: movie.title,
      poster: movie.poster?.url,
      genres: movie.genres,
      status: movie.status,
    },
  });
};

exports.updateMovieStatus = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return res.json("Invalid ID");

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(404).json("Movie Not Found!");

  const { status } = req.body;

  movie.status = status;

  await movie.save();

  res.json({
    message: "Movie is updated",
    movie: {
      id: movie._id,
      title: movie.title,
      poster: movie.poster?.url,
      genres: movie.genres,
      status: movie.status,
    },
  });
};

exports.removeMovie = async (req, res) => {
  const { movieId } = req.params;

  if (!isValidObjectId(movieId)) return res.json("Invalid Movie ID!");

  const movie = await Movie.findById(movieId);
  if (!movie) return res.status(404).json("Movie Not Found!");

  await Movie.findByIdAndDelete(movieId);

  res.json({ message: "Movie removed successfully." });
};

exports.getMovies = async (req, res) => {
  const { pageNo, limit = 0 } = req.query;
  const totalRecord = await Movie.countDocuments();

  const movies = await Movie.find({})
    .skip(parseInt(pageNo) * parseInt(limit) + 1)
    .limit(parseInt(limit));

  const results = movies.map((movie) => ({
    id: movie._id,
    title: movie.title,
    poster: movie.poster?.url,
    year: movie.year,
    type: movie.type,
    status: movie.status,
    imagePath: movie.imagePath,
    trailerPath: movie.trailerPath,
  }));

  res.json({ movies: results, totalRecord: totalRecord });
};

exports.searchMovies = async (req, res) => {
  const { title } = req.query;

  if (!title.trim()) return sendError(res, "Invalid request!");

  const movies = await Movie.find({ title: { $regex: title, $options: "i" } });
  res.json({
    results: movies.map((m) => {
      return {
        id: m._id,
        title: m.title,
        status: m.status,
      };
    }),
  });
};

exports.getSingleMovie = async (req, res) => {
  console.log(req.params);
  const { movieId } = req.params;

  if (!isValidObjectId(movieId))
    return sendError(res, "Movie id is not valid!");

  const movie = await Movie.findById(movieId);

  console.log(movie);

  const reviews = {};

  const { title, year, status, director, imagePath, trailerPath, type } = movie;

  res.json({
    movie: {
      title,
      director,
      imagePath,
      trailerPath,
      year,
      status,

      type,
    },
  });
};
