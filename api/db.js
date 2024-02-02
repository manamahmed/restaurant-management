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
            title TEXT NOT NULL,
            img TEXT,
            description TEXT,
            location TEXT,
            opening_hours TEXT
        )`,
          (err) => {
            if (!err) {
              // Insert sample data into the restaurants table
              const restaurantStmt = db.prepare(`
                INSERT INTO restaurants (title, img, description, location, opening_hours)
                VALUES (?, ?, ?, ?, ?)
                `);

              restaurantStmt.run(
                "Restaurant A",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "A cozy place",
                "123 Main Street, Cityville",
                "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 8:00 PM"
              );

              restaurantStmt.run(
                "Restaurant B",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Family-friendly",
                "456 Oak St",
                "Mon-Sun: 12:00 PM - 11:00 PM"
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
            img TEXT,
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
                  INSERT INTO menus (name, img, description, price, category, restaurant_id)
                  VALUES (?, ?, ?, ?, ?, ?)
                  `);

              menuStmt.run(
                "Menu 1",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Delicious starters",
                10.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "Menu 2",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Special main courses",
                19.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Menu 3",
                "img/afif-ramdhasuma-omcpmrw4fKw-unsplash.jpg",
                "Special main courses",
                19.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Menu 3",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Kids menu",
                7.99,
                "Dessert",
                2
              );
              menuStmt.run(
                "Menu 4",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Desserts",
                8.99,
                "Main Dish",
                2
              );

              menuStmt.finalize();
            }
          }
        );
      }
    }
  );

  // Orders table
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='orders'",
    (err, table) => {
      if (!table) {
        // Create the orders table
        db.run(
          `CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            total_price REAL NOT NULL,
            user_email TEXT NOT NULL,
            menus TEXT NOT NULL,
            address TEXT NOT NULL
          )`,
          (err) => {
            if (!err) {
              // Insert sample data into the orders table
              const orderStmt = db.prepare(`
                  INSERT INTO orders (total_price, user_email, menus, address)
                  VALUES (?, ?, ?, ?)
                  `);

              orderStmt.run(
                20,
                "manam@email.com",
                "book,pen",
                "teststr. 10, Duisburg"
              );

              orderStmt.finalize();
            }
          }
        );
      }
    }
  );

  // users table
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
    (err, table) => {
      if (!table) {
        // Create the orders table
        db.run(
          `CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            address TEXT NOT NULL
          )`,
          (err) => {
            if (!err) {
              // Insert sample data into the orders table
              const userStmt = db.prepare(`
                  INSERT INTO orders (first_name, last_name, email, address)
                  VALUES (?, ?, ?, ?)
                  `);

              userStmt.run(
                "Manam",
                "Ahmed",
                "manam@email.com",
                "teststr. 10, Duisburg"
              );

              userStmt.finalize();
            }
          }
        );
      }
    }
  );
});

module.exports = db;
