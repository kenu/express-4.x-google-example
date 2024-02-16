require("dotenv").config();

const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const NaverStrategy = require("passport-naver").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env["GITHUB_CLIENT_ID"],
      clientSecret: process.env["GITHUB_CLIENT_SECRET"],
      callbackURL: "/login/github/return",
    },
    function (_accessToken, _refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
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

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env["KAKAO_CLIENT_ID"],
      clientSecret: process.env["KAKAO_CLIENT_SECRET"],
      callbackURL: "/login/kakao/return",
      scope: "profile_image",
    },
    function (_accessToken, _refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: process.env["NAVER_CLIENT_ID"],
      clientSecret: process.env["NAVER_CLIENT_SECRET"],
      callbackURL: "/login/naver/return",
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

app.get("/login/github", passport.authenticate("github"));

app.get(
  "/login/github/return",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (_req, res) {
    res.redirect("/");
  }
);

app.get("/login/google", passport.authenticate("google"));

app.get(
  "/login/google/return",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (_req, res) {
    res.redirect("/");
  }
);

app.get("/login/kakao", passport.authenticate("kakao"));

app.get(
  "/login/kakao/return",
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  function (_req, res) {
    res.redirect("/");
  }
);

app.get("/login/naver", passport.authenticate("naver"));

app.get(
  "/login/naver/return",
  passport.authenticate("naver", { failureRedirect: "/login" }),
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
