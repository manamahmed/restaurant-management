const express = require("express");
const db = require("../db.js");

const router = express.Router();

// Endpoint to get orders with menu items
router.get("/api/orders", (req, res) => {
  const userEmail = "foyez@email.com";

  db.all(
    `SELECT *
    FROM orders
    WHERE orders.user_email = ?`,
    [userEmail],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: "Error retrieving orders details",
        });
      }

      if (rows.length === 0) {
        return res.status(404).json({ error: "Orders not found" });
      }

      res.json(rows);
    }
  );
});

module.exports = router;
