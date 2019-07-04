const express = require("express");
const router = express.Router();
const Product = require("./../models/Product");

/* GET home page */

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/rentbike", (req, res) => {
  //startMap();
  Product.find({})
    .then(product => {
      product.forEach(element => {});
      console.log(product);
      res.render("products", { product, scripts: ["rentbikes.js"] });
    })
    .catch(err => {
      res.render("products", { err });
    });
});

router.get("/rentbike/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      // console.log(product);
      res.render("one_product", { product });
    })
    .catch(error => {
      console.log("fuckon error", error);
    });
});

router.get("/allBikes/api", (req, res) => {
  Product.find()
    .then(dbRes => res.send(dbRes))
    .catch(dbErr => console.log(dbErr));
});

module.exports = router;
