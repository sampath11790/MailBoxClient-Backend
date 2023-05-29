const Sequelize = require("sequelize");
const db = require("../Utli/database");
// const { Module } = require("module");

const Inbox = db.define("inbox", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  From: {
    type: Sequelize.STRING,
  },
  readreceipt: {
    type: Sequelize.BOOLEAN,
  },
  subject: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
});

module.exports = Inbox;
