const express = require("express");

const { getDirectors } = require("../controllers/director");

const {
  createMovie,
  updateMovie,
  removeMovie,
  getMovies,
  searchMovies,
  getSingleMovie,
  updateMovieStatus,
} = require("../controllers/movie");

const { addReview, getReviewsByMovie } = require("../controllers/review");

const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/create", createMovie);

router.patch("/update/:movieId", updateMovie);

router.delete("/remove/:movieId", isAuth, removeMovie);
router.get("/movies", isAuth, getMovies);
router.get("/update/:movieId", isAuth, getSingleMovie);
router.get("/search", isAuth, searchMovies);
router.post("/create", isAuth, createMovie);
router.put("/update/:movieId", isAuth, updateMovie);
router.patch("/updatestatus/:movieId", isAuth, updateMovieStatus);
router.get("/directors", isAuth, getDirectors);
router.post("/review/:movieId", addReview);
router.get("/reviews/:movieId", getReviewsByMovie);

module.exports = router;
