const express = require("express");
const db = require("../db.js");

const router = express.Router();

// Endpoint to get orders
router.get("/api/orders/:email", (req, res) => {
  const userEmail = req.params.email;

  db.all(
    `SELECT *
    FROM orders
    WHERE orders.user_email = ?`,
    [userEmail],
    (err, rows) => {
      if (err) {
        // Error retrieving orders details
        return res.status(500).json([]);
      }

      if (rows.length === 0) {
        // Orders not found
        return res.status(404).json([]);
      }

      res.json(rows);
    }
  );
});

// Endpoint to make an order
router.post("/api/orders", (req, res) => {
  const newOrder = req.body;

  // Validate required fields
  if (
    !newOrder.email ||
    !newOrder.menus ||
    !newOrder.total_price ||
    !newOrder.address
  ) {
    return res.status(400).json({
      error: "email, menus, total_price and address fields are required.",
    });
  }

  // Insert new restaurant into the database
  const stmt = db.prepare(`
    INSERT INTO orders (total_price, user_email, menus, address)
    VALUES (?, ?, ?, ?)
    `);

  stmt.run(
    newOrder.total_price,
    newOrder.email,
    newOrder.menus,
    newOrder.address
  );

  stmt.finalize();

  db.get("SELECT * FROM orders WHERE id = last_insert_rowid()", (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error retrieving the newly added order" });
    }

    res.status(201).json(row);
  });
});

module.exports = router;
