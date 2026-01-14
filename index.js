const express = require("express");
const multer = require("multer");
const path = require("path");
const sequelize = require("./utils/db.util");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + extension;

    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const productRoute = require("./routes/product.route");

const app = express();

app.use(express.json());
app.use("/public", express.static("uploads"));

app.use("/products", productRoute);

app.get("/", (req, res) => {
  const pesan = { message: "API MK Backend" };

  res.status(200).json(pesan);
});

app.post("/profile", upload.single("foto"), function (req, res, next) {
  const { id } = req.body;
  res.status(200).json({ id, file: req.file.filename });
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
