const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  make: String,
  model: String,
  horsepower: Number,
  bodytype: String,
  displacement: Number,
  description: String,
  image: {
    type: String,
    default: "/images/Ducati.jpg"
  },
  dailyprice: {
    type: Number,
    min: 0
  },
  location: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
