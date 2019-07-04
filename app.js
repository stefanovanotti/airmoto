require("dotenv").config();
require("./config/db_connection.js");

// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials");
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use(
  session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

app.use((req, res, next) => {
  // console.log(req);
  if (req.session && req.session.currentUser) {
    app.locals.isLoggedIn = true;
    app.locals.currentUser = req.session.currentUser;
  } else {
    app.locals.isLoggedIn = false;
    app.locals.currentUser = null;
  }
  next();
});

const index = require("./routes/index");
app.use("/", index);
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/admin"));
app.use("/", require("./routes/rent"));
// default value for title local
app.locals.title = "AirMoto";

module.exports = app;
