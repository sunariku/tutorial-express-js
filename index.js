const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pos",
});

/* Root */
app.get('/', (req, res) => {
  const pesan = { message: "Hello World" };

  res.status(200).json(pesan);
});
/* End Root */

/* Tes */
app.get('/tes-bcrypt', (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("rahasia", salt);

    res.status(200).json({ hashed: hash });
  } catch (e) {
    res.status(500).json({ message: 'Error' })
  }
});

app.get('/tes-jwt', (req, res) => {
  try {
    var token = jwt.sign({ username: 'subali@mail.com', role: 'member' }, 'rahasia');

    res.status(200).json(token);
  } catch (e) {
    res.status(500).json({ message: 'Error' })
  }
});
/* End Tes */

/* Artikel */
app.get('/artikel', (req, res) => {
  try {
    db.query(`SELECT * FROM products`, (err, data) => {
      if(err) throw err;

      res.status(200).json(data);
    });
  } catch (e) {
    res.status(500).json({message: `Error ${e}`});
  }
});

app.get('/artikel/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    db.query(`SELECT * FROM products WHERE id = '${id}'`, (err, data) => {
      if(err) throw err;

      res.status(200).json(data[0]);
    });
  } catch (e) {
    res.status(500).json({message: `Error ${e}`});
  }
});

app.post('/artikel', (req, res) => {
  try{
    const { name, price } = req.body;

    db.query(`
      INSERT INTO products
      (
        name,
        price
      )
      VALUES
      (
        '${name}',
        ${price}
      )`, (err, data) => {
      if (err) throw err;

      res.status(200).json({ message : "Berhasil" });
    });
  } catch (e) {
    res.status(500).json({ message : "Error" });
  }
});

app.put('/artikel/:id', (req, res) => {
try{
    const { id } = req.params;
    const { name, price } = req.body;
    
    db.query(`
      UPDATE products
      SET
        name = '${name}',
        price = ${price}
      WHERE id = ${id}`, (err, data) => {
      if (err) throw err;

      res.status(200).json({ message : "Berhasil" });
    });
  } catch (e) {
    res.status(500).json({ message : "Error" });
  }
});

app.delete('/artikel/:id', (req,res) => {
try{
    const { id } = req.params;
    
    db.query(`
      DELETE FROM products
      WHERE id = ${id}`, (err, data) => {
      if (err) throw err;

      res.status(200).json({ message : "Berhasil dihapus" });
    });
  } catch (e) {
    res.status(500).json({ message : "Error" });
  }
});
/* End Artikel */

app.listen(3000, () => {
  console.log("Server Berjalan");
});
