const mongoose = require("mongoose");

const studioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    }
}
   
);



//module.exports = mongoose.model("Studio", studioSchema);
