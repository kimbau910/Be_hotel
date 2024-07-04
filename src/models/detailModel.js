const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    imageMap: { type: String },
    type: { type: String, require: true },
    price: { type: String, require: true },
    rating: { type: Number, required: true },
    description: { type: String },
    overview: { type: String },
    convenient: { type: String },
    discount: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail;
