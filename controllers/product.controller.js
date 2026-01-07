const productSchema = require("../validations/product.schema");
const Product = require("../models/Product");

const getProduct = async (req, res) => {
  try {
    const data = await Product.findAll();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: `Error ${e}` });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await Product.findByPk(id);

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: `Error ${e}` });
  }
};

const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Validasi Error" });
    }

    await Product.create(value);

    res.status(200).json({ message: "Berhasil" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Validasi Error" });
    }

    await Product.update(value, {
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Berhasil" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.destroy({ where: { id } });

    res.status(200).json({ message: "Berhasil" });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
