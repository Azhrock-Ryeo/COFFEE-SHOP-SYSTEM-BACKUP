const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// route
app.use('/products', require('./routes/productRoutes'))

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});