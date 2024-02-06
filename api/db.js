const sqlite3 = require("sqlite3").verbose();

const DB_SOURCE = "./db.sqlite";
const db = new sqlite3.Database(DB_SOURCE);

// Create tables and insert sample data
db.serialize(() => {
  // restaurants table
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
                "img/miti-YXjr5gdbGnI-unsplash.jpg",
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
                "img/marika-sartori-ZD_CEnhS630-unsplash.jpg",
                "Family-friendly",
                "222 Spice Boulevard, Flavortown",
                "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 8:00 PM",
                4.5
              );
              restaurantStmt.run(
                "Ocean Grill",
                "img/nick-karvounis-YmyFBvW7oG8-unsplash.jpg",
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
                "img/mixed-ingredient-pizza-wooden-board.jpg",
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

  // menus table
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
              // Restaurant 1 main menu
              menuStmt.run(
                "Menu 1",
                "mainDish/main_dish_4.jpg",
                "Delicious starters",
                10.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "AlfredoChicken",
                "mainDish/main_dish_1.jpg",
                "Creamy Alfredo sauce with grilled chicken",
                14.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "Margherita Pizza",
                "mainDish/main_dish_2.jpg",
                "Fresh tomatoes, mozzarella, and basil",
                10.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "Grilled Salmon",
                "mainDish/main_dish_3.jpg",
                "Grilled salmon fillet with lemon and herbs",
                16.99,
                "Main Dish",
                1
              );

              // For Restaurants 1 Dessert
              menuStmt.run(
                "Tiramisu",
                "desserts/dessert_1.jpg",
                "Layered coffee-flavored Italian dessert",
                7.99,
                "Dessert",
                1
              );
              menuStmt.run(
                "Chocolate Fondue",
                "desserts/dessert_2.jpg",
                "Assorted fruits with melted chocolate",
                8.99,
                "Dessert",
                1
              );
              menuStmt.run(
                "Cheesecake",
                "desserts/dessert_3.jpg",
                "Classic New York-style cheesecake",
                9.99,
                "Dessert",
                1
              );
              menuStmt.run(
                "Fruit Sorbet",
                "desserts/dessert_4.jpg",
                "Refreshing mixed fruit sorbet",
                5.99,
                "Dessert",
                1
              );

              // Restaurant 1 Drinks

              menuStmt.run(
                "Mojito",
                "drinks/drinks_1.jpg",
                "Refreshing minty lime cocktail",
                6.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Red Wine",
                "drinks/drinks_2.jpg",
                "Rich and full-bodied red wine",
                12.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Iced Latte",
                "drinks/drinks_3.jpg",
                "Chilled espresso with milk",
                4.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Soda",
                "drinks/drinks_4.jpg",
                "Assorted soft drinks",
                2.99,
                "Drinks",
                1
              );

              // Restaurant 1 Snacks
              menuStmt.run(
                "Bruschetta",
                "snacks/snacks_1.jpg",
                "Toasted bread with tomato and basil topping",
                19.99,
                "Snacks",
                1
              );
              menuStmt.run(
                "Garlic Bread",
                "snacks/snacks_2.jpg",
                "Warm bread with garlic butter",
                14.99,
                "Snacks",
                1
              );
              menuStmt.run(
                "Chicken Wings",
                "snacks/snacks_3.jpg",
                "Crispy chicken wings with various sauces",
                8.99,
                "Snacks",
                1
              );
              menuStmt.run(
                "Caprese Skewers",
                "snacks/snacks_4.jpg",
                "Mozzarella, tomato, and basil skewers",
                12.99,
                "Snacks",
                1
              );

              // Restaurant 2 main menu
              menuStmt.run(
                "Steak with Chimichurri",
                "mainDish/main_dish_1.jpg",
                "Grilled steak with tangy chimichurri sauce",
                18.99,
                "Main Dish",
                2
              );
              menuStmt.run(
                "BBQ Ribs",
                "mainDish/main_dish_2.jpg",
                "Slow-cooked BBQ ribs with smoky flavor",
                17.99,
                "Main Dish",
                2
              );
              menuStmt.run(
                "Shrimp Scampi",
                "mainDish/main_dish_3.jpg",
                "Garlic butter shrimp served over pasta",
                15.99,
                "Main Dish",
                2
              );
              menuStmt.run(
                "Vegetarian Stir-Fry",
                "mainDish/main_dish_4.jpg",
                "Assorted vegetables stir-fried to perfection",
                10.99,
                "Main Dish",
                2
              );

              // Restaurant 2 Dessert
              menuStmt.run(
                "Apple Pie",
                "desserts/dessert_5.jpg",
                "Homemade apple pie with a flaky crust",
                10.99,
                "Dessert",
                2
              );
              menuStmt.run(
                "Molten Lava Cake",
                "desserts/dessert_6.jpg",
                "Warm chocolate cake with a gooey center",
                10.99,
                "Dessert",
                2
              );
              menuStmt.run(
                "Panna Cotta",
                "desserts/dessert_7.jpg",
                "Creamy Italian dessert with berry coulis",
                13.99,
                "Dessert",
                2
              );
              menuStmt.run(
                "Frozen Yogurt",
                "desserts/dessert_8.jpg",
                "Refreshing frozen yogurt with assorted toppings",
                6.99,
                "Dessert",
                2
              );

              // Restaurant 2 Drinks

              menuStmt.run(
                "Sangria",
                "drinks/drinks_5.jpg",
                "Fruity wine punch with assorted fruits",
                6.99,
                "Drinks",
                2
              );
              menuStmt.run(
                "Craft Beer",
                "drinks/drinks_6.jpg",
                "Locally brewed craft beer with a variety of flavors",
                7.99,
                "Drinks",
                2
              );
              menuStmt.run(
                "Margarita",
                "drinks/drinks_7.jpg",
                "Classic margarita with a salted rim",
                8.99,
                "Drinks",
                2
              );
              menuStmt.run(
                "Lemonade",
                "drinks/drinks_8.jpg",
                "Freshly squeezed lemonade with a hint of mint",
                4.99,
                "Drinks",
                2
              );

              // Restaurant 2 snacks
              menuStmt.run(
                "Loaded Nachos",
                "snacks/snacks_5.jpg",
                "Nachos topped with cheese, jalapeños, and salsa",
                8.99,
                "Snacks",
                2
              );
              menuStmt.run(
                "Mozzarella Sticks",
                "snacks/snacks_6.jpg",
                "Crispy mozzarella sticks with marinara sauce",
                5.99,
                "Snacks",
                2
              );
              menuStmt.run(
                "Spinach Artichoke Dip",
                "snacks/snacks_7.jpg",
                "Freshly squeezed lemonade with a hint of mint",
                9.99,
                "Snacks",
                2
              );
              menuStmt.run(
                "Garlic Fries",
                "snacks/snacks_8.jpg",
                "Crispy fries tossed with garlic and herbs",
                7.99,
                "Snacks",
                2
              );

              // Restaurant 3 Main Dish
              menuStmt.run(
                "Quinoa Salad",
                "mainDish/main_dish_9.jpg",
                "Healthy salad with quinoa, mixed greens, and vinaigrette",
                9.99,
                "Main menu",
                3
              );
              menuStmt.run(
                "Caprese Panini",
                "mainDish/main_dish_10.jpg",
                "Grilled panini with mozzarella, tomato, and basil",
                8.99,
                "Main menu",
                3
              );
              menuStmt.run(
                "Vegetable Curry",
                "mainDish/main_dish_11.jpg",
                "Spicy vegetable curry served with rice",
                12.99,
                "Main menu",
                3
              );
              menuStmt.run(
                "Stuffed Bell Peppers",
                "mainDish/main_dish_12.jpg",
                "Bell peppers stuffed with quinoa and veggies",
                17.99,
                "Main menu",
                3
              );

              // Restaurant 3 ar Dessert
              menuStmt.run(
                "Chia Seed Pudding",
                "desserts/dessert_9.jpg",
                "Bell peppers stuffed with quinoa and veggies",
                18.99,
                "Dessert",
                3
              );
              menuStmt.run(
                "Chia Seed Pudding",
                "desserts/dessert_10.jpg",
                "https://example.com/fruit-parfait.jpg",
                13.99,
                "Dessert",
                3
              );
              menuStmt.run(
                "Vegan Chocolate Cake",
                "desserts/dessert_11.jpg",
                "Moist chocolate cake made without dairy or eggs",
                10.99,
                "Dessert",
                3
              );
              menuStmt.run(
                "Coconut Sorbet",
                "desserts/dessert_12.jpg",
                "Bell peppers stuffed with quinoa and veggies",
                14.99,
                "Dessert",
                3
              );

              // Restaurant 3 Drinks
              menuStmt.run(
                "Green Smoothie",
                "drinks/drinks_9.jpg",
                "Healthy smoothie with spinach, banana, and green fruits",
                6.99,
                "Drinks",
                3
              );
              menuStmt.run(
                "Detox Water",
                "drinks/drinks_10.jpg",
                "Infused water with cucumber, lemon, and mint",
                11.99,
                "Drinks",
                3
              );
              menuStmt.run(
                "Herbal Tea",
                "drinks/drinks_11.jpg",
                "Warm herbal tea with a blend of aromatic herbs",
                11.99,
                "Drinks",
                3
              );
              menuStmt.run(
                "Fresh Orange Juice",
                "drinks/drinks_12.jpg",
                "Squeezed orange juice, rich in Vitamin C",
                14.99,
                "Drinks",
                3
              );

              // Restaurant 3 snacks
              menuStmt.run(
                "Avocado Toast",
                "snacks/snacks_9.jpg",
                "Toasted bread with mashed avocado and cherry tomatoes",
                7.99,
                "Snacks",
                3
              );
              menuStmt.run(
                "Cucumber Rolls",
                "snacks/snacks_10.jpg",
                "Fresh cucumber rolls with cream cheese and herbs",
                6.99,
                "Snacks",
                3
              );
              menuStmt.run(
                "Kale Chips",
                "snacks/snacks_11.jpg",
                "Crispy kale chips with sea salt",
                5.99,
                "Snacks",
                3
              );
              menuStmt.run(
                "Edamame",
                "snacks/snacks_12.jpg",
                "Steamed edamame with sea salt",
                4.99,
                "Snacks",
                3
              );

              // Restaurant 4 Main dish
              menuStmt.run(
                "Chicken Curry",
                "mainDish/main_dish_13.jpg",
                "Spicy chicken curry with aromatic spices",
                12.99,
                "Main menu",
                4
              );
              menuStmt.run(
                "Paneer Tikka Masala",
                "mainDish/main_dish_14.jpg",
                "Paneer cubes in a creamy tomato-based sauce",
                7.99,
                "Main menu",
                4
              );
              menuStmt.run(
                "Biryani",
                "mainDish/main_dish_15.jpg",
                "Fragrant rice dish with meat, vegetables, and spices",
                14.99,
                "Main menu",
                4
              );
              menuStmt.run(
                "Tandoori Mixed Grill",
                "mainDish/main_dish_16.jpg",
                "Assorted grilled meats with tandoori spices",
                8.99,
                "Main menu",
                4
              );

              // Restaurant 4 Dessert
              menuStmt.run(
                "Gulab Jamun",
                "desserts/dessert_13.jpg",
                "Deep-fried dumplings in sugar syrup",
                6.99,
                "Dessert",
                4
              );
              menuStmt.run(
                "Rasmalai",
                "desserts/dessert_14.jpg",
                "Soft cheese dumplings in saffron-flavored milk",
                3.99,
                "Dessert",
                4
              );
              menuStmt.run(
                "Mango Lassi Popsicle",
                "desserts/dessert_15.jpg",
                "Refreshing mango lassi in frozen popsicle form",
                2.99,
                "Dessert",
                4
              );
              menuStmt.run(
                "Kheer",
                "desserts/dessert_16.jpg",
                "Assorted grilled meats with tandoori spices",
                5.99,
                "Dessert",
                4
              );

              // Restaurant 4 Drinks
              menuStmt.run(
                "Masala Chai",
                "drinks/drinks_13.jpg",
                "Assorted grilled meats with tandoori spices",
                5.99,
                "Drinks",
                4
              );
              menuStmt.run(
                "Mango Lassi",
                "drinks/drinks_14.jpg",
                "Yogurt-based drink with fresh mango pulp",
                4.99,
                "Drinks",
                4
              );
              menuStmt.run(
                "Rose Sharbat",
                "drinks/drinks_15.jpg",
                "Rose-flavored syrup mixed with water",
                2.99,
                "Drinks",
                4
              );
              menuStmt.run(
                "Thandai",
                "drinks/drinks_16.jpg",
                "Cooling drink with almonds, fennel, and cardamom",
                6.99,
                "Drinks",
                4
              );

              // Restaurant 4 Snacks
              menuStmt.run(
                "Samosa",
                "snacks/snacks_13.jpg",
                "Crispy pastry filled with spiced potatoes and peas",
                1.99,
                "Snacks",
                4
              );
              menuStmt.run(
                "Chicken Pakora",
                "snacks/snacks_14.jpg",
                "Deep-fried chicken fritters with spices",
                2.99,
                "Snacks",
                4
              );
              menuStmt.run(
                "Papdi Chaat",
                "snacks/snacks_15.jpg",
                "Crunchy snack with yogurt, chutney, and spices",
                3.99,
                "Snacks",
                4
              );
              menuStmt.run(
                "Aloo Tikki",
                "snacks/snacks_16.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Snacks",
                4
              );

              //  Restaurant 5 main menu
              menuStmt.run(
                "Grilled Lobster Tail",
                "mainDish/main_dish_17.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                5
              );
              menuStmt.run(
                "Seafood Paella",
                "mainDish/main_dish_18.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                5
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "mainDish/main_dish_19.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                5
              );
              menuStmt.run(
                "Sushi Platter",
                "mainDish/main_dish_20.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                5
              );

              //  Restaurant 5 Desserts
              menuStmt.run(
                "Key Lime Pie",
                "desserts/dessert_17.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                5
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/dessert_18.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                5
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/dessert_19.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                5
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/dessert_1.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                5
              );

              //  Restaurant 5 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "drinks/drinks_17.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                5
              );
              menuStmt.run(
                "Blue Lagoon",
                "drinks/drinks_18.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                5
              );
              menuStmt.run(
                "Frozen Margarita",
                "drinks/drinks_19.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                5
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "drinks/drinks_20.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                5
              );

              //  Restaurant 5 snacks
              menuStmt.run(
                "Crab Cakes",
                "snacks/snacks_17.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                5
              );
              menuStmt.run(
                "Calamari Rings",
                "snacks/snacks_18.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                5
              );
              menuStmt.run(
                "Clam Chowder",
                "snacks/snacks_1.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                5
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "snacks/snacks_2.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                5
              );

              //  Restaurant 6 main menu
              menuStmt.run(
                "Grilled Lobster Tail",
                "mainDish/main_dish_21.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                6
              );
              menuStmt.run(
                "Seafood Paella",
                "mainDish/main_dish_22.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                6
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "mainDish/main_dish_1.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                6
              );
              menuStmt.run(
                "Sushi Platter",
                "mainDish/main_dish_2.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                6
              );

              //  Restaurant 6 Desserts
              menuStmt.run(
                "Key Lime Pie",
                "desserts/dessert_2.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                6
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/dessert_3.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                6
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/dessert_4.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                6
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/dessert_5.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                6
              );

              //  Restaurant 6 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "drinks/drinks_1.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                6
              );
              menuStmt.run(
                "Blue Lagoon",
                "drinks/drinks_2.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                6
              );
              menuStmt.run(
                "Frozen Margarita",
                "drinks/drinks_3.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                6
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "drinks/drinks_4.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                6
              );

              //  Restaurant 6 snacks
              menuStmt.run(
                "Crab Cakes",
                "snacks/snacks_3.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                6
              );
              menuStmt.run(
                "Calamari Rings",
                "snacks/snacks_4.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                6
              );
              menuStmt.run(
                "Clam Chowder",
                "snacks/snacks_5.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                6
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "snacks/snacks_6.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                6
              );

              //  Restaurant 7 main menu
              menuStmt.run(
                "Grilled Lobster Tail",
                "mainDish/main_dish_3.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                7
              );
              menuStmt.run(
                "Seafood Paella",
                "mainDish/main_dish_4.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                7
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "mainDish/main_dish_5.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                7
              );
              menuStmt.run(
                "Sushi Platter",
                "mainDish/main_dish_6.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                7
              );

              //  Restaurant 7 Desserts
              menuStmt.run(
                "Key Lime Pie",
                "desserts/dessert_4.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                7
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/dessert_5.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                7
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/dessert_6.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                7
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/dessert_7.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                7
              );

              //  Restaurant 7 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "drinks/drinks_5.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                7
              );
              menuStmt.run(
                "Blue Lagoon",
                "drinks/drinks_6.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                7
              );
              menuStmt.run(
                "Frozen Margarita",
                "drinks/drinks_7.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                7
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "drinks/drinks_8.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                7
              );

              //  Restaurant 7 snacks
              menuStmt.run(
                "Crab Cakes",
                "snacks/snacks_7.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                7
              );
              menuStmt.run(
                "Calamari Rings",
                "snacks/snacks_8.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                7
              );
              menuStmt.run(
                "Clam Chowder",
                "snacks/snacks_9.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                7
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "snacks/snacks_10.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                7
              );

              //  Restaurant 8 main menu
              menuStmt.run(
                "Grilled Lobster Tail",
                "mainDish/main_dish_8.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                8
              );
              menuStmt.run(
                "Seafood Paella",
                "mainDish/main_dish_9.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                8
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "mainDish/main_dish_10.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                8
              );
              menuStmt.run(
                "Sushi Platter",
                "mainDish/main_dish_11.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                8
              );

              //  Restaurant 8 Desserts
              menuStmt.run(
                "Key Lime Pie",
                "desserts/dessert_8.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                8
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/dessert_9.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                8
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/dessert_10.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                8
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/dessert_11.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                8
              );

              //  Restaurant 8 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "drinks/drinks_9.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                8
              );
              menuStmt.run(
                "Blue Lagoon",
                "drinks/drinks_10.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                8
              );
              menuStmt.run(
                "Frozen Margarita",
                "drinks/drinks_11.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                8
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "drinks/drinks_12.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                8
              );

              //  Restaurant 8 snacks
              menuStmt.run(
                "Crab Cakes",
                "snacks/snacks_9.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                8
              );
              menuStmt.run(
                "Calamari Rings",
                "snacks/snacks_10.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                8
              );
              menuStmt.run(
                "Clam Chowder",
                "snacks/snacks_11.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                8
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "snacks/snacks_12.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                8
              );

              //  Restaurant 9 main menu
              menuStmt.run(
                "Grilled Lobster Tail",
                "mainDish/main_dish_9.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                9
              );
              menuStmt.run(
                "Seafood Paella",
                "mainDish/main_dish_10.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                9
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "mainDish/main_dish_11.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                9
              );
              menuStmt.run(
                "Sushi Platter",
                "mainDish/main_dish_12.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                9
              );

              //  Restaurant 9 Desserts
              menuStmt.run(
                "Key Lime Pie",
                "desserts/dessert_9.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                9
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/dessert_10.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                9
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/dessert_11.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                9
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/dessert_12.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                9
              );

              //  Restaurant 9 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "drinks/drinks_9.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                9
              );
              menuStmt.run(
                "Blue Lagoon",
                "drinks/drinks_10.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                9
              );
              menuStmt.run(
                "Frozen Margarita",
                "drinks/drinks_11.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                9
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "drinks/drinks_12.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                9
              );

              //  Restaurant 9 snacks
              menuStmt.run(
                "Crab Cakes",
                "snacks/snacks_13.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                9
              );
              menuStmt.run(
                "Calamari Rings",
                "snacks/snacks_14.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                9
              );
              menuStmt.run(
                "Clam Chowder",
                "snacks/snacks_15.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                9
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "snacks/snacks_16.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                9
              );

              //  Restaurant 10 main menu
              menuStmt.run(
                "Grilled Lobster Tail",
                "mainDish/main_dish_13.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                10
              );
              menuStmt.run(
                "Seafood Paella",
                "mainDish/main_dish_14.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                10
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "mainDish/main_dish_15.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                10
              );
              menuStmt.run(
                "Sushi Platter",
                "mainDish/main_dish_16.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                10
              );

              //  Restaurant 10 Desserts
              menuStmt.run(
                "Key Lime Pie",
                "desserts/dessert_13.jpg",
                "Florida-style key lime pie with graham cracker crust",
                10.99,
                "Dessert",
                10
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/dessert_14.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                10
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/dessert_15.jpg",
                "Refreshing sorbet made with fresh mangoes",
                10.99,
                "Dessert",
                10
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/dessert_16.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                10
              );

              //  Restaurant 10 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "drinks/drinks_13.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                10
              );
              menuStmt.run(
                "Blue Lagoon",
                "drinks/drinks_14.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                10
              );
              menuStmt.run(
                "Frozen Margarita",
                "drinks/drinks_15.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                10
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "drinks/drinks_16.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                10
              );

              //  Restaurant 10 snacks
              menuStmt.run(
                "Crab Cakes",
                "snacks/snacks_13.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                10
              );
              menuStmt.run(
                "Calamari Rings",
                "snacks/snacks_14.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                10
              );
              menuStmt.run(
                "Clam Chowder",
                "snacks/snacks_15.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                10
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "snacks/snacks_16.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                10
              );

              menuStmt.finalize();
            }
          }
        );
      }
    }
  );

  // orders table
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
                40,
                "manamahmed68@email.com",
                "Stuffed Bell Peppers",
                "teststr. 10, Duisburg"
              );

              orderStmt.run(
                13.45,
                "manamahmed68@email.com",
                "Cucumber Mint Cooler,Seared Tuna Bites",
                "Hermanstr. 10, Duisburg"
              );

              orderStmt.run(
                13.85,
                "mdrajibsorkar965@gmail.com",
                "Frozen Margarita",
                "Hingbergstr. 146, Mülheim"
              );
              orderStmt.run(
                14.5,
                "mdrajibsorkar965@gmail.com",
                "Fresh Orange Juice",
                "Brükstr. 123, Mülheim"
              );
              orderStmt.run(
                13.5,
                "md.nasif008@gmail.com",
                "Vegan Chocolate Cake",
                "Tülppenstr. 15, Duisburg"
              );
              orderStmt.run(
                13.75,
                "md.nasif008@gmail.com",
                "Blackened Mahi-Mahi",
                "Brükstr. 123, Mülheim"
              );
              orderStmt.run(
                18.25,
                "kashemali1423@gmail.com",
                "Calamari Rings",
                "Bollostr.45, Mülheim"
              );
              orderStmt.run(
                17.5,
                "kashemali1423@gmail.com",
                "Pineapple Coconut Mojito",
                "Lortzingstr. 123, Mülheim"
              );

              orderStmt.run(
                18.25,
                "foyez@gmail.com",
                "Calamari Rings",
                "Bollostr.45, Mülheim"
              );
              orderStmt.run(
                17.5,
                "foyez@gmail.com",
                "Pineapple Coconut Mojito",
                "Lortzingstr. 123, Mülheim"
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
          `CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            address TEXT NOT NULL
          )`
          // (err) => {
          //   if (!err) {
          //     // Insert sample data into the orders table
          //     const userStmt = db.prepare(`
          //         INSERT INTO users (first_name, last_name, email, address)
          //         VALUES (?, ?, ?, ?)
          //         `);

          //     userStmt.run(
          //       "Manam",
          //       "Ahmed",
          //       "manamahmed68@gmail.com",
          //       "teststr. 10, Duisburg"
          //     );

          //     userStmt.finalize();
          //   }
          // }
        );
      }
    }
  );
});

module.exports = db;

// mdrajibsorkar965@gmail.com
// md.nasif008@gmail.com
// manamahmed68@gmail.com
// kashemali1423@gmail.com
