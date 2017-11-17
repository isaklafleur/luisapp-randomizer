"use strict";

const express = require("express");

const Team = require("../models/team").Team;

const router = express.Router();

router.get("/", (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login");
    return;
  }
  Team.find({ owner: req.user._id })
    .then(teams => {
      const data = {
        teams
      };
      res.render("team/index", data);
    })
    .catch(err => {
      if (err) {
        next(err);
      }
    });
});

module.exports = router;
