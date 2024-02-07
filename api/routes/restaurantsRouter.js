const express = require("express");
const db = require("../db.js");

const router = express.Router();

// Endpoint to get a list of restaurants
router.get("/api/restaurants", (req, res) => {
  const zipCode = req.query.zip;

  // Get the current time in HH:mm:ss format
  const currentTime = new Date().toLocaleTimeString("de-DE", { hour12: false });

  if (zipCode) {
    // Fetch restaurants with delivery radius including the provided zip code
    db.all(
      `
      SELECT * FROM restaurants
      WHERE delivery_radius LIKE ?
      AND opening_time <= ?
      AND closing_time >= ?
    `,
      [`%${zipCode}%`, currentTime, currentTime],
      (err, restaurants) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error retrieving restaurants" });
        }

        res.json(restaurants);
      }
    );
  } else {
    // Fetch the list of restaurants from the database
    db.all(
      `
      SELECT * FROM restaurants
      WHERE opening_time <= ?
      AND closing_time >= ?
    `,
      [currentTime, currentTime],
      (err, rows) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error retrieving restaurant list" });
        }

        res.json(rows);
      }
    );
  }
});

// Endpoint to get restaurant with menu items
router.get("/api/restaurants/:restaurantIdOrEmail", (req, res) => {
  const restaurantIdOrEmail = req.params.restaurantIdOrEmail;

  let query = `SELECT restaurants.*, menus.id AS menu_id, menus.name AS menu_name, menus.img AS menu_image, menus.description AS menu_description, menus.price AS menu_price, menus.category AS menu_category
  FROM restaurants
  LEFT JOIN menus ON restaurants.id = menus.restaurant_id`;

  if (restaurantIdOrEmail.includes("@")) {
    query = `${query}
    WHERE restaurants.email = ?`;
  } else {
    query = `${query}
    WHERE restaurants.id = ?`;
  }

  db.all(query, [restaurantIdOrEmail], (err, rows) => {
    if (err) {
      return res.status(500).json({});
    }

    if (rows.length === 0) {
      return res.status(404).json({});
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
  });
});

// Endpoint to add a new restaurant
router.post("/api/restaurants", (req, res) => {
  const newRestaurant = req.body;

  // Validate required fields
  if (
    !newRestaurant.name ||
    !newRestaurant.description ||
    !newRestaurant.street ||
    !newRestaurant.zip
  ) {
    return res.status(400).json({
      error: "name, description, street and zip fields are required.",
    });
  }

  // Insert new restaurant into the database
  const stmt = db.prepare(`
    INSERT INTO restaurants (name, description, street, zip, email, opening_time, closing_time, delivery_radius, img)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

  stmt.run(
    newRestaurant.name,
    newRestaurant.description,
    newRestaurant.street,
    newRestaurant.zip,
    newRestaurant.email,
    newRestaurant.opening_time,
    newRestaurant.closing_time,
    newRestaurant.delivery_radius,
    newRestaurant.image || ""
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
        INSERT INTO menus (category, name, img, description, price, restaurant_id)
        VALUES (?, ?, ?, ?, ?, ?)
        `);

      stmt.run(
        newMenu.category,
        newMenu.name,
        newMenu.image || "",
        newMenu.description || "",
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

// Endpoint to delete a menu item
router.delete("/api/restaurants/:restaurantId/menus/:menuId", (req, res) => {
  const restaurantId = req.params.restaurantId;
  const menuId = req.params.menuId;

  // Execute the DELETE query
  db.run(
    "DELETE FROM menus WHERE id = ? AND restaurant_id = ?",
    [menuId, restaurantId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Menu item deleted successfully",
      });
    }
  );
});

module.exports = router;
