const express = require("express");
const db = require("../db.js");

const router = express.Router();

// Endpoint to add a new user
router.post("/api/customers", (req, res) => {
  const newUser = req.body;

  // Validate required fields
  if (!newUser.first_name || !newUser.last_name || !newUser.email) {
    return res.status(400).json({
      error: "first_name, last_name and email fields are required.",
    });
  }

  // Insert a new user into the database
  const stmt = db.prepare(`
      INSERT INTO customers (first_name, last_name, email, street, zip)
      VALUES (?, ?, ?, ?, ?)
      `);

  stmt.run(
    newUser.first_name,
    newUser.last_name,
    newUser.email,
    newUser.street,
    newUser.zip
  );

  stmt.finalize();

  db.get(
    "SELECT * FROM customers WHERE id = last_insert_rowid()",
    (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error retrieving the newly added user" });
      }

      res.status(201).json(row);
    }
  );
});

// Endpoint to get user info
router.get("/api/customers/:email", (req, res) => {
  const userEmail = req.params.email;

  db.get(
    `SELECT *
    FROM customers
    WHERE users.email = ?`,
    [userEmail],
    (err, user) => {
      if (err) {
        // Error retrieving users details
        return res.status(500).json({});
      }

      if (!user) {
        // Users not found
        return res.status(404).json({});
      }

      res.json(user);
    }
  );
});

module.exports = router;
