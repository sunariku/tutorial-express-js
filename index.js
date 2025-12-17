const express = require("express");

const productRoute = require("./routes/product.route");

const app = express();

app.use(express.json());

app.use("/products", productRoute);

app.get("/", (req, res) => {
  const pesan = { message: "API MK Backend" };

  res.status(200).json(pesan);
});

app.listen(3000, () => {
  console.log("Server Berjalan");
});
