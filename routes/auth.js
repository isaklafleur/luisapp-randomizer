"use strict";

const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/User").User;

const bcryptSalt = 10;

// -- login

router.get("/login", function(req, res, next) {
  const data = {
    message: req.flash("error")
  };
  res.render("auth/login", data);
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/team",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

// -- signup

router.get("/signup", (req, res, next) => {
  const data = {
    message: req.flash("error")
  };
  res.render("auth/signup", data);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    const data = {
      message: "Please provide username and password"
    };
    res.render("auth/signup", data);
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (user) {
      const data = {
        message: "The username already exists"
      };
      res.render("auth/signup", data);
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        next(err);
        return;
      }

      req.login(newUser, () => {
        res.redirect("/team");
      });
    });
  });
});

module.exports = router;
