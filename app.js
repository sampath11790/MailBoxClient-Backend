const dotenv = require("dotenv").config();

const express = require("express");
const DB = require("./Utli/database");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Route/auth");
const EmailRouter = require("./Route/mail");
//middleware

app.use(bodyparser.json({ extended: false }));
app.use(cors());
app.use(AuthRouter);
app.use(EmailRouter);
//modules

const User = require("./Module/Auth");
const Inbox = require("./Module/inbox");
const SentItem = require("./Module/sentmail");
const Draft = require("./Module/Draft");

app.use("/", (req, res, next) => {
  console.log("req", req.body);
  //   res.json(req.body);
});
// Association
User.hasMany(Inbox);
User.hasMany(SentItem);
User.hasMany(Draft);

Inbox.belongsTo(User);
SentItem.belongsTo(User);
Draft.belongsTo(User);

DB.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("server connected");
    });
  })
  .catch((err) => console.log(err));
