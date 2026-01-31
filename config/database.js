const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library_db", "root", "opangs123", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
