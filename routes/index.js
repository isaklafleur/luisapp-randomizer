"use strict";

const express = require("express");

const router = express.Router();

router.get("/", function(req, res, next) {
  if (req.user) {
    res.redirect("/team");
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
