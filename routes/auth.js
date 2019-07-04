const express = require("express");
const router = new express.Router();
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require("../models/User");

router.get("/login", (req, res, next) => {
  res.render("logins");
});

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// BCrypt to encrypt passwords

router.post("/signup", (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (email === "" || password === "") {
    res.render("signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ email: email })
    .then(user => {
      if (user !== null) {
        res.render("signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }

      User.create({
        firstname,
        lastname,
        email,
        password: hashPass
      })
        .then(() => {
          res.redirect("/");
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

router.post("/login", (req, res, next) => {
  console.log(req.body);

  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if (theEmail === "" || thePassword === "") {
    res.render("logins", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log(">YOYOYO");
        res.render("logins", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        console.log("hello");
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("logins", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // can't access session here
    res.redirect("/login");
  });
});

module.exports = router;
