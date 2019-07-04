const express = require("express");
const router = express.Router();
const Product = require("./../models/Product");
const Booking = require("./../models/Booking");

router.get("/rent/:id", (req, res) => {
  if (!req.session.currentUser) return res.redirect("/login");
  Product.findById(req.params.id)
    .then(product => {
      res.render("rentit", { product });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/rent/:id", (req, res) => {
  console.log("get ready to book");
  const {
    firstname,
    lastname,
    date,
    email,
    phonenumber,
    message,
    productid,
    owner
  } = req.body;

  Booking.create({
    firstname,
    lastname,
    date,
    email,
    phonenumber,
    message,
    productid,
    owner
  })
    .then(dbres => {
      console.log("you got your booking");
      res.render("bookingdone");
    })
    .catch(err => {
      console.log("something is wrong");
      console.log(err);
    });
});

module.exports = router;
