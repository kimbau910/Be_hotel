const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    imaga: { type: String, require: true },
    type: { type: String, require: true },
    price: { type: Number, require: true },
    counInStock: { type: Number, require: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Detail = mongoose.model("Detail", detailSchema);

model.exports = Detail;
