const mongoose = require("mongoose");
const studioSchema = require("./studio");
const directorSchema = require("./director");
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  year: {
    type: Number,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Public", "Private"],
  },
  type: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: false,
  },
  trailerPath: {
    type: String,
    required: false,
  },

  director: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Director",
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema, "moives");
