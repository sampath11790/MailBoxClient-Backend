const express = require("express");
const Draft = require("../Controller/draft");
const tokenValidation = require("../Middleware/Authorization");
const route = express.Router();

route.get("/user/getdraft", tokenValidation, Draft.getDraft);
route.post("/user/draft", tokenValidation, Draft.postDraft);
route.delete("/user/deletedraft", tokenValidation, Draft.deleteDraft);

module.exports = route;
