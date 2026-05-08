const db = require("../config/db");


// =====================================
// REGISTER
// =====================================
exports.register = (req, res) => {

  const {
    username,
    email,
    password
  } = req.body;


  // CHECK IF EMAIL EXISTS
  const checkSql = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  db.query(checkSql, [email], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Server error"
      });
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }


    // INSERT USER
    const insertSql = `
      INSERT INTO users
      (
        name,
        email,
        password,
        role
      )
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [
        username,
        email,
        password,
        "user"
      ],
      (err, result) => {

        if (err) {
          return res.status(500).json({
            message: "Registration failed"
          });
        }

        res.status(201).json({
          message: "Registration successful"
        });
      }
    );

  });
};



// =====================================
// LOGIN
// =====================================
exports.login = (req, res) => {

  const {
    username,
    password
  } = req.body;


  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
    AND password = ?
  `;

  db.query(
    sql,
    [
      username,
      password
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Server error"
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid credentials"
        });
      }


      const user = result[0];


      res.status(200).json({
        message: "Login success",

        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    }
  );
};