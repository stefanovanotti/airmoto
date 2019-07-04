const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  firstname: String,
  lastname: String,
  date: Date,
  email: String,
  phonenumber: Number,
  message: String,
  productid: String,
  owner: String
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
