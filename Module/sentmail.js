const Sequelize = require("sequelize");
const db = require("../Utli/database");

const SentItem = db.define("senditem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  From: {
    type: Sequelize.STRING,
  },
  subject: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
});

module.exports = SentItem;
