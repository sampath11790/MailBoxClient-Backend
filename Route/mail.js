const express = require("express");
const Mail = require("../Controller/mail");
const tokenValidation = require("../Middleware/Authorization");
const route = express.Router();

route.get("/user/getmail", tokenValidation, Mail.getMail);
route.post("/user/sendmail", tokenValidation, Mail.PostMail);
route.put("/user/update", tokenValidation, Mail.updateMail);

module.exports = route;
