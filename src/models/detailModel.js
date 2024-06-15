const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    type: { type: String, require: true },
    price: { type: Number, require: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;
