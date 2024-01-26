const sqlite3 = require("sqlite3").verbose();

const DB_SOURCE = "./db.sqlite";
const db = new sqlite3.Database(DB_SOURCE);

// Create tables and insert sample data
db.serialize(() => {
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='restaurants'",
    (err, table) => {
      if (!table) {
        // Create the restaurants table
        db.run(
          `CREATE TABLE restaurants (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT,
            description TEXT,
            address TEXT,
            opening_time DATETIME
        )`,
          (err) => {
            if (!err) {
              // Insert sample data into the restaurants table
              const restaurantStmt = db.prepare(`
                INSERT INTO restaurants (name, image, description, address, opening_time)
                VALUES (?, ?, ?, ?, ?)
                `);

              restaurantStmt.run(
                "Restaurant A",
                "",
                "A cozy place",
                "123 Main St",
                "2024-01-25 12:00:00"
              );
              restaurantStmt.run(
                "Restaurant B",
                "",
                "Family-friendly",
                "456 Oak St",
                "2024-01-25 18:00:00"
              );

              restaurantStmt.finalize();
            }
          }
        );
      }
    }
  );

  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='menus'",
    (err, table) => {
      if (!table) {
        // Create the menus table
        db.run(
          `CREATE TABLE menus (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            image TEXT,
            description TEXT,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            restaurant_id INTEGER,
            FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
          )`,
          (err) => {
            if (!err) {
              // Insert sample data into the menus table
              const menuStmt = db.prepare(`
                  INSERT INTO menus (name, image, description, price, category, restaurant_id)
                  VALUES (?, ?, ?, ?, ?, ?)
                  `);

              menuStmt.run(
                "Menu 1",
                "",
                "Delicious starters",
                10.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "Menu 2",
                "",
                "Special main courses",
                19.99,
                "Drinks",
                1
              );
              menuStmt.run("Menu 3", "", "Kids menu", 7.99, "Dessert", 2);
              menuStmt.run("Menu 4", "", "Desserts", 8.99, "Main Dish", 2);

              menuStmt.finalize();
            }
          }
        );
      }
    }
  );
});

module.exports = db;
