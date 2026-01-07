const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db.util");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

module.exports = Product;
