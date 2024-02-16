require("dotenv").config();

const express = require("express");
const passport = require("passport");
const Strategy = require("passport-google-oauth20").Strategy;

passport.use(
  new Strategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/login/google/return",
      scope: "profile",
    },
    function (_accessToken, _refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.render("home", { user: req.user });
});

app.get("/login", function (_req, res) {
  res.render("login");
});

app.get("/login/google", passport.authenticate("google"));

app.get(
  "/login/google/return",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (_req, res) {
    res.redirect("/");
  }
);

app.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  function (req, res) {
    res.render("profile", { user: req.user });
  }
);

app.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const listener = app.listen(process.env["PORT"] || 3000, () => {
  console.log(`http://localhost:${listener.address().port}`);
});
