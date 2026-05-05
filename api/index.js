const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// get products from MySQL
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// add product to MySQL
app.post('/products', (req, res) => {
  const { name, description, price, stock, category_id, created_by } = req.body;

  // sql query
  const sql = `INSERT INTO products (name, description, price, stock, category_id, created_by)
              VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [name, description, price, stock, category_id, created_by], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json({
      message: "Success!",
      new_product_id: result.insertId,
    });
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});