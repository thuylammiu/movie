const mongoose = require("mongoose");

const directorSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("Director", directorSchema, "director");
