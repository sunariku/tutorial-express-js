const db = require("../utils/db.util");
const productSchema = require("../validations/product.schema");

const getProduct = (req, res) => {
  try {
    db.query(`SELECT * FROM products`, (err, data) => {
      if (err) throw err;

      res.status(200).json(data);
    });
  } catch (e) {
    res.status(500).json({ message: `Error ${e}` });
  }
};

const getProductById = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    db.query(`SELECT * FROM products WHERE id = '${id}'`, (err, data) => {
      if (err) throw err;

      res.status(200).json(data[0]);
    });
  } catch (e) {
    res.status(500).json({ message: `Error ${e}` });
  }
};

const createProduct = (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if(error) {
      return res.status(400).json({message: 'Validasi Error'});
    }

    const { name, price } = value;

    db.query(
      `
      INSERT INTO products
      (
        name,
        price
      )
      VALUES
      (
        '${name}',
        ${price}
      )`,
      (err, data) => {
        if (err) throw err;

        res.status(200).json({ message: "Berhasil" });
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    db.query(
      `
      UPDATE products
      SET
        name = '${name}',
        price = ${price}
      WHERE id = ${id}`,
      (err, data) => {
        if (err) throw err;

        res.status(200).json({ message: "Berhasil" });
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};

const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;

    db.query(
      `
      DELETE FROM products
      WHERE id = ${id}`,
      (err, data) => {
        if (err) throw err;

        res.status(200).json({ message: "Berhasil dihapus" });
      }
    );
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
