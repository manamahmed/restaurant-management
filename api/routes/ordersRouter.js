const express = require("express");
const db = require("../db.js");

const router = express.Router();

// // Endpoint to get restaurants based on status and order by created_at
// app.get("/restaurants", (req, res) => {
//   // Fetch restaurants with status "pending" or "preparing"
//   db.all(
//     `
//     SELECT * FROM restaurants
//     WHERE status IN ('pending', 'preparing')
//     ORDER BY created_at ASC
//   `,
//     (err, pendingRestaurants) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ error: "Error retrieving pending or preparing restaurants" });
//       }

//       // Fetch restaurants with status "rejected" or "completed"
//       db.all(
//         `
//       SELECT * FROM restaurants
//       WHERE status IN ('rejected', 'completed')
//       ORDER BY created_at ASC
//     `,
//         (err, otherRestaurants) => {
//           if (err) {
//             return res.status(500).json({
//               error: "Error retrieving rejected or completed restaurants",
//             });
//           }

//           // Combine the two sets of restaurants
//           const allRestaurants = pendingRestaurants.concat(otherRestaurants);

//           res.json(allRestaurants);
//         }
//       );
//     }
//   );
// });

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

// Endpoint to get orders with restaurant email
router.get("/api/ordersByRestaurantEmail/:restaurantEmail", (req, res) => {
  const restaurantEmail = req.params.restaurantEmail;

  db.get(
    "SELECT * FROM restaurants WHERE email = ?",
    [restaurantEmail],
    (err, restaurant) => {
      console.log({ restaurant });
      if (err) {
        return res.status(500).json([]);
      }
      if (!restaurant) {
        return res.json([]);
      }

      // db.all(
      //   `SELECT *
      //   FROM orders
      //   WHERE orders.restaurant_id = ?`,
      //   [restaurant.id],
      //   (err, rows) => {
      //     if (err) {
      //       // Error retrieving orders details
      //       return res.status(500).json([]);
      //     }

      //     if (rows.length === 0) {
      //       // Orders not found
      //       return res.status(404).json([]);
      //     }

      //     res.json(rows);
      //   }
      // );

      // Fetch restaurants with status "pending" or "preparing"
      db.all(
        `
        SELECT * FROM orders
        WHERE status IN ('pending', 'preparing') AND restaurant_id = ?
        ORDER BY created_at ASC
      `,
        [restaurant.id],
        (err, pendingOrders) => {
          if (err) {
            return res.status(500).json({
              error: "Error retrieving pending or preparing restaurants",
            });
          }

          // Fetch orders with status "rejected" or "completed"
          db.all(
            `
            SELECT * FROM orders
            WHERE status IN ('rejected', 'completed') AND restaurant_id = ?
            ORDER BY created_at ASC
          `,
            [restaurant.id],
            (err, otherOrders) => {
              if (err) {
                return res.status(500).json({
                  error: "Error retrieving rejected or completed restaurants",
                });
              }

              // Combine the two sets of restaurants
              const allRestaurants = pendingOrders.concat(otherOrders);

              res.json(allRestaurants);
            }
          );
        }
      );
    }
  );
});

// Endpoint to make an order
router.post("/api/orders", (req, res) => {
  const newOrder = req.body;

  // Validate required fields
  if (!newOrder.email || !newOrder.menus || !newOrder.total_price) {
    return res.status(400).json({
      error: "email, menus and total_price fields are required.",
    });
  }

  db.get(
    "SELECT * FROM customers WHERE email = ?",
    [newOrder.email],
    (err, user) => {
      if (!err) {
        const { street, zip } = user;

        // Insert new restaurant into the database
        const stmt = db.prepare(`
        INSERT INTO orders (total_price, user_email, menus, address, restaurant_id, status, info)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run(
          newOrder.total_price,
          newOrder.email,
          newOrder.menus,
          `${street}, ${zip}`,
          newOrder.restaurant_id,
          "pending",
          newOrder.info
        );

        stmt.finalize();

        db.get(
          "SELECT * FROM orders WHERE id = last_insert_rowid()",
          (err, row) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Error retrieving the newly added order" });
            }

            res.status(201).json(row);
          }
        );
      }
    }
  );
});

// Endpoint to update the "status" field
router.put("/api/orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  if (!newStatus) {
    return res.status(400).json({
      status: "error",
      message: "Status is required for the update",
      data: null,
    });
  }

  // Update the "address" field in the "restaurants" table
  const stmt = db.prepare(`
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `);

  stmt.run(newStatus, orderId, (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Error updating restaurant address",
        data: null,
      });
    }

    // Fetch the updated restaurant details from the database
    db.get(
      "SELECT * FROM orders WHERE id = ?",
      [orderId],
      (err, updatedOrder) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Error retrieving updated restaurant details",
            data: null,
          });
        }

        res.json({
          status: "success",
          message: "Order status updated successfully",
          data: updatedOrder,
        });
      }
    );
  });

  stmt.finalize();
});

module.exports = router;
