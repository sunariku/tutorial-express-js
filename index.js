const express = require("express");
const sequelize = require("./utils/db.util");

const productRoute = require("./routes/product.route");

const app = express();

app.use(express.json());

app.use("/products", productRoute);

app.get("/", (req, res) => {
  const pesan = { message: "API MK Backend" };

  res.status(200).json(pesan);
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen(3000, () => {
  console.log("Server Berjalan");
});
