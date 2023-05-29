const bcrypt = require("bcrypt");
const Auth = require("../Module/Auth");
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
        });
      } else {
        res.status(400).json({ error: "Enter valid data", isMatch });
      }
    }
  } catch (err) {
    res.status(400).json({ error: "Enter valid data", err: err });
  }

  // res.send(req.body);
};
