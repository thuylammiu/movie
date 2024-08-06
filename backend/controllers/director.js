const { isValidObjectId } = require("mongoose");

const Director = require("../models/director");

exports.getDirectors = async (req, res) => {
  try {
    const directors = await Director.find({});

    res.json(directors);
  } catch {
    res.json("Error when loading directors");
  }
};
