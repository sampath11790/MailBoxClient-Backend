const express = require("express");
// const Mail=require("../Controller/mail")
const tokenValidation = require("../Middleware/Authorization");
const route = express.Router();

route.get("/user/getmail", tokenValidation, (req, res, next) => {
  res.json({ message: "success", user: req.user });
});
route.post("/user/sendmail", tokenValidation, (req, res, next) => {
  res.json({ message: "success" });
});

module.exports = route;
