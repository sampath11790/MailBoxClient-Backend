const dotenv = require("dotenv").config();

const express = require("express");
const DB = require("./Utli/database");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Route/auth");
const EmailRouter = require("./Route/mail");
const DraftRoute = require("./Route/draft");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const accesslogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("combined", { stream: accesslogStream }));
//middleware

app.use(bodyparser.json({ extended: false }));
app.use(cors());
app.use(helmet());

//Routes
app.use(AuthRouter);
app.use(EmailRouter);
app.use(DraftRoute);

//modules

const User = require("./Model/Auth");
const Inbox = require("./Model/inbox");
const SentItem = require("./Model/sentmail");
const Draft = require("./Model/Draft");

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
    app.listen(process.env.PORT || 3000, () => {
      console.log("server connected");
    });
  })
  .catch((err) => console.log(err));
