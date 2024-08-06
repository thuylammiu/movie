const { isValidObjectId } = require("mongoose");
const Movie = require("../models/movie");
const Review = require("../models/review");

exports.addReview = async (req, res) => {
  const { movieId } = req.params;
  const { name, email, rating, content } = req.body;

  const movie = await Movie.findOne({ _id: movieId });
  if (!movie) return res.status(404).json("Movie not found");

  const newReview = new Review({
    name: name,
    parentMovie: movie._id,
    content: content,
    rating: rating,
    email: email,
  });

  await newReview.save();
  res.json({ message: "Your review has been added." });
};

exports.getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  const reviews = await Review.find({ parentMovie: movieId });
  res.json(reviews);
};
