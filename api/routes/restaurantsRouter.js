const express = require("express");
const db = require("../db.js");

const router = express.Router();

// Endpoint to get a list of restaurants
router.get("/api/restaurants", (req, res) => {
  // Fetch the list of restaurants from the database
  db.all(
    `
    SELECT * FROM restaurants
  `,
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error retrieving restaurant list" });
      }

      res.json(rows);
    }
  );
});

// Endpoint to get restaurant with menu items
router.get("/api/restaurants/:restaurantId", (req, res) => {
  const restaurantId = req.params.restaurantId;

  db.all(
    `SELECT restaurants.*, menus.id AS menu_id, menus.name AS menu_name, menus.img AS menu_image, menus.description AS menu_description, menus.price AS menu_price, menus.category AS menu_category
    FROM restaurants
    LEFT JOIN menus ON restaurants.id = menus.restaurant_id
    WHERE restaurants.id = ?`,
    [restaurantId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: "Error retrieving restaurant details",
        });
      }

      if (rows.length === 0) {
        return res.status(404).json([]);
      }

      const restaurantDetails = {
        id: rows[0].id,
        title: rows[0].title,
        img: rows[0].img,
        description: rows[0].description,
        location: rows[0].location,
        opening_hours: rows[0].opening_hours,
        menus: [],
      };

      rows.forEach((row) => {
        if (row.menu_id) {
          restaurantDetails.menus.push({
            menu_id: row.menu_id,
            name: row.menu_name,
            img: row.menu_image,
            description: row.menu_description,
            price: row.menu_price,
            category: row.menu_category,
          });
        }
      });

      res.json(restaurantDetails);
    }
  );
});

module.exports = router;
