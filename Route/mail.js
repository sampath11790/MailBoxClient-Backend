const express = require("express");
const Mail = require("../Controller/mail");
const tokenValidation = require("../Middleware/Authorization");
const route = express.Router();

route.get("/user/getmail", tokenValidation, Mail.getMail);
route.post("/user/sendmail", tokenValidation, Mail.PostMail);
route.put("/user/update", tokenValidation, Mail.updateMail);
route.delete("/user/sentmail", tokenValidation, Mail.deleteSentmail);
route.delete("/user/inbox", tokenValidation, Mail.deleteinboxmail);
module.exports = route;
