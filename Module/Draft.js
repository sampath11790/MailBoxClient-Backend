const Sequelize = require("sequelize");
const db = require("../Utli/database");
// const { Module } = require("module");

const Draft = db.define("draft", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  To: {
    type: Sequelize.STRING,
  },

  subject: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
});

module.exports = Draft;
