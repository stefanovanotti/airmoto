const express = require("express");
const router = new express.Router();
const Product = require("./../models/Product");
const Booking = require("./../models/Booking");
const uploaderMiddleware = require("./../config/cloudinary");

router.get("/addbike", (req, res) => {
  if (!req.session.currentUser) return res.redirect("/login");
  res.render("add-bike", { scripts: ["addbike.js"] });
});
// {
//   scripts: ["addbike.js"];
// }
router.post("/addbike", uploaderMiddleware.single("image"), (req, res) => {
  // return console.log(req.body);
  console.log("YYOYOYOY", req.body);
  const {
    make,
    model,
    owner_id,
    horsepower,
    displacement,
    dailyprice,
    description,
    location,
    email,
    bodytype
  } = req.body;

  if (req.file) var image = req.file.secure_url;
  const newProduct = new Product({
    make,
    model,
    horsepower,
    displacement,
    bodytype,
    dailyprice,
    description,
    location,
    owner: owner_id,
    email,
    image
  });

  Product.create(newProduct)
    .then(dbRes => {
      console.log("TEST", dbRes);
      res.redirect("/rentbike");
    })
    .catch(error => {
      console.log("db problem !!!");
      console.log(error);
    });
});

router.get("/yourbikes", (req, res) => {
  console.log(req.session.currentUser._id);
  Product.find({ owner: req.session.currentUser._id }).then(product => {
    console.log(product);
    res.render("yourbikes", { product });
  });
});

router.get("/yourrequests", (req, res) => {
  console.log(req.session.currentUser._id);
  Booking.find({ owner: req.session.currentUser._id }).then(request => {
    console.log(request);
    res.render("yourrequests", { request });
  });
});

router.get("/edit/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      console.log("yee");
      res.render("bike_edit", { product });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post(
  "/edit/:id",
  uploaderMiddleware.single("image_product"),
  (req, res) => {
    console.log("get ready for change");
    const {
      make,
      model,
      horsepower,
      displacement,
      dailyprice,
      description,
      location,
      image,
      bodytype
    } = req.body;

    if (req.file) newProduct.image = req.file.secure_url;

    Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        make,
        model,
        horsepower,
        displacement,
        dailyprice,
        description,
        location,
        image,
        bodytype
      }
    )
      .then(dbres => {
        console.log("you got it man");
        res.redirect("/yourbikes");
      })
      .catch(err => {
        console.log("smt is wrong");
        console.log(err);
      });
  }
);

router.get("/delete/:id", (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id })
    .then(response => {
      console.log(response);
      res.redirect("/yourbikes");
    })
    .catch(err => console.log(err));
});

module.exports = router;
