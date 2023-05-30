const JWT = require("jsonwebtoken");
const Auth = require("../Model/Auth");

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const response = await JWT.verify(token, process.env.JWT_SECRET_KEY);
    const User = await Auth.findByPk(response.userId);
    if (User) {
      req.user = User;
      next();
    }
  } catch (err) {
    res
      .status(401)
      .json({ error: "yor are not authorized to acceess this page" });
  }
};
module.exports = tokenValidation;
