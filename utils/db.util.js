const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("pos", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
