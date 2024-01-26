const express = require("express");
const db = require("../db.js");

const router = express.Router();

// Endpoint to get restaurants with menu items
router.get("/api/restaurants", (req, res) => {
  db.all(
    `
      SELECT restaurants.*, menus.id AS menu_id, menus.name AS menu_name, menus.image AS menu_image, menus.description AS menu_description, menus.price AS menu_price, menus.category AS menu_category
      FROM restaurants
      LEFT JOIN menus ON restaurants.id = menus.restaurant_id
    `,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      const restaurantsWithMenus = {};

      rows.forEach((row) => {
        if (!restaurantsWithMenus[row.id]) {
          restaurantsWithMenus[row.id] = {
            id: row.id,
            name: row.name,
            image: row.image,
            description: row.description,
            address: row.address,
            opening_time: row.opening_time,
            menus: [],
          };
        }

        if (row.menu_id) {
          restaurantsWithMenus[row.id].menus.push({
            id: row.menu_id,
            name: row.menu_name,
            image: row.menu_image,
            description: row.menu_description,
            price: row.menu_price,
            category: row.menu_category,
          });
        }
      });

      res.json(Object.values(restaurantsWithMenus));
    }
  );
});

// Endpoint to add a new restaurant
router.post("/api/restaurants", (req, res) => {
  const newRestaurant = req.body;

  // Validate required fields
  if (
    !newRestaurant.name ||
    !newRestaurant.description ||
    !newRestaurant.address ||
    !newRestaurant.opening_time
  ) {
    return res.status(400).json({
      error: "name, description, address and opening_time fields are required.",
    });
  }

  // Insert new restaurant into the database
  const stmt = db.prepare(`
    INSERT INTO restaurants (name, description, address, opening_time)
    VALUES (?, ?, ?, ?)
    `);

  stmt.run(
    newRestaurant.name,
    newRestaurant.image || "",
    newRestaurant.description,
    newRestaurant.address,
    newRestaurant.opening_time
  );

  stmt.finalize();

  db.get(
    "SELECT * FROM restaurants WHERE id = last_insert_rowid()",
    (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error retrieving the newly added restaurant" });
      }

      res.status(201).json(row);
    }
  );
});

// Endpoint to add a new menu to a specific restaurant
router.post("/api/restaurants/:restaurantId/menus", (req, res) => {
  const restaurantId = req.params.restaurantId;
  const newMenu = req.body;

  // validate required fields
  if (!newMenu.name || !newMenu.price || !newMenu.category) {
    return res.status(400).json({
      error: "Name, price and category are required for a new menu",
    });
  }

  // Check if the specified restaurant exists
  db.get(
    "SELECT * FROM restaurants WHERE id = ?",
    [restaurantId],
    (err, restaurant) => {
      if (err) {
        return res.status(500).json({
          error: "Error checking the existence of the restaurant",
        });
      }

      if (!restaurant) {
        return res.status(404).json({
          error: "Restaurant not found",
        });
      }

      const stmt = db.prepare(`
        INSERT INTO menus (name, description, price, restaurant_id)
        VALUES (?, ?, ?, ?)
        `);

      stmt.run(
        newMenu.name,
        newMenu.image || "",
        newMenu.description || null,
        newMenu.price,
        restaurantId
      );

      stmt.finalize();

      // Fetch the newly added menu from the database
      db.get(
        "SELECT * FROM menus WHERE id = last_insert_rowid()",
        (err, row) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error retrieving the newly added menu" });
          }

          res.status(201).json(row);
        }
      );
    }
  );
});

module.exports = router;
