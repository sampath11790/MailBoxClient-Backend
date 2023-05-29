const dotenv = require("dotenv").config();

const express = require("express");
const DB = require("./Utli/database");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Route/auth");

//middleware

app.use(bodyparser.json({ extended: false }));
app.use(cors());
app.use(AuthRouter);

//modules

const Auth = require("./Module/Auth");

app.use("/", (req, res, next) => {
  console.log("req", req.body);
  //   res.json(req.body);
});
// Association

DB.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("server connected");
    });
  })
  .catch((err) => console.log(err));
