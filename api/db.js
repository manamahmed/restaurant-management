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
            opening_hours TEXT,
            rating REAL NOT NULL
        )`,
          (err) => {
            if (!err) {
              // Insert sample data into the restaurants table
              const restaurantStmt = db.prepare(`
                INSERT INTO restaurants (title, img, description, location, opening_hours, rating)
                VALUES (?, ?, ?, ?, ?, ?)
                `);

              restaurantStmt.run(
                "Fresh Delights",
                "img/brooke-lark-8beTH4VkhLI-unsplash.jpg",
                "A cozy place",
                "789 Garden Lane, Greensville",
                "Mon-Fri: 10:00 AM - 8:00 PM, Sat-Sun: 11:00 AM - 7:00 PM",
                4
              );

              restaurantStmt.run(
                "Tasty Bites",
                "img/brooke-lark-8beTH4VkhLI-unsplash.jpg",
                "Family-friendly",
                "123 Main Street, Cityville",
                "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 8:00 PM",
                5
              );
              restaurantStmt.run(
                "Fresh Delights",
                "img/jose-tebar-rlcIcF532ns-unsplash.jpg",
                "Family-friendly",
                "789 Garden Lane, Greensville",
                "Mon-Fri: 10:00 AM - 8:00 PM, Sat-Sun: 11:00 AM - 7:00 PM",
                3.5
              );
              restaurantStmt.run(
                "Spice Kingdom",
                "img/brooke-lark-8beTH4VkhLI-unsplash.jpg",
                "Family-friendly",
                "222 Spice Boulevard, Flavortown",
                "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 8:00 PM",
                4.5
              );
              restaurantStmt.run(
                "Ocean Grill",
                "img/jose-tebar-rlcIcF532ns-unsplash.jpg",
                "Family-friendly",
                "555 Seafood Avenue, Marinetown",
                "Wed-Sat: 5:00 PM - 11:00 PM, Sun: 4:00 PM - 9:00 PM",
                4
              );
              restaurantStmt.run(
                "Veggie Delight",
                "img/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai.jpg",
                "Family-friendly",
                "777 Green Avenue, Vegantown",
                "Mon-Sat: Tue-Sat: 11:00 AM - 9:00 PM, Sun: 12:00 PM - 7:00 PM",
                4
              );
              restaurantStmt.run(
                "Mediterranean Flavors",
                "img/giovanna-gomes-qeMfOXmDWpA-unsplash.jpg",
                "Family-friendly",
                "456 Olive Street, Meditown",
                "Mon-Sat: 12:00 PM - 10:00 PM, Sun: 1:00 PM - 9:00 PM",
                4.5
              );
              restaurantStmt.run(
                "Sizzling Steaks",
                "img/ibrahim-boran-Q9KUfbgzGnA-unsplash.jpg",
                "Family-friendly",
                "123 Grill Street, Meatropolis",
                "Tue-Sun: 5:00 PM - 11:00 PM",
                5
              );
              restaurantStmt.run(
                "Café Aroma",
                "img/jose-tebar-rlcIcF532ns-unsplash.jpg",
                "Family-friendly",
                "789 Espresso Lane, Coffeeville",
                "Mon-Sat: 7:00 AM - 8:00 PM, Sun: 8:00 AM - 6:00 PM",
                4
              );
              restaurantStmt.run(
                "Tasty Tacos",
                "img/karlis-dambrans-oLHk_WLupSc-unsplash.jpg",
                "Family-friendly",
                "567 Salsa Street, Tacotown",
                "Mon-Sat: 11:00 AM - 9:00 PM, Sun: 12:00 PM - 8:00 PM",
                3.5
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
