const bcrypt = require("bcrypt");
const Auth = require("../Model/Auth");
const JWT = require("jsonwebtoken");
exports.signup = (req, res, next) => {
  //   res.send(req.body);

  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (!err) {
      const obj = {
        email: req.body.email,
        password: hash,
      };

      // res.json(obj);
      Auth.create(obj)
        .then(res.status(200).json({ message: "signup successful" }))
        .catch((err) => res.status(400).json({ error: "Enter valid data" }));
    }
  });
};

exports.login = async (req, res, next) => {
  try {
    const obj = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await Auth.findAll({ where: { email: req.body.email } });

    if (user.length > 0) {
      const isMatch = await bcrypt.compare(obj.password, user[0].password);
      // console.log(isMatch);
      if (isMatch) {
        res.status(200).json({
          message: "login success",
          Token: getToken(user[0].id),
        });
      } else {
        res.status(400).json({ error: "Enter valid data" });
      }
    }
  } catch (err) {
    res.status(400).json({ error: "Enter valid data" });
  }
};

function getToken(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY);
}
