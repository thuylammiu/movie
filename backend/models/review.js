const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Review", reviewSchema, "reviews");
