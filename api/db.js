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
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Delicious starters",
                10.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "AlfredoChicken",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Creamy Alfredo sauce with grilled chicken",
                14.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "Margherita Pizza",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Fresh tomatoes, mozzarella, and basil",
                10.99,
                "Main Dish",
                1
              );
              menuStmt.run(
                "Grilled Salmon",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Grilled salmon fillet with lemon and herbs",
                16.99,
                "Main Dish",
                1
              );

              // For Restaurants 1 Dessert
              menuStmt.run(
                "Tiramisu",
                "desserts/aliona-gumeniuk-GAauSStia3s-unsplash.jpg",
                "Layered coffee-flavored Italian dessert",
                7.99,
                "Dessert",
                1
              );
              menuStmt.run(
                "Chocolate Fondue",
                "desserts/anthony-espinosa-6iqpLKqeaE0-unsplash.jpg",
                "Assorted fruits with melted chocolate",
                8.99,
                "Dessert",
                1
              );
              menuStmt.run(
                "Cheesecake",
                "desserts/assorment-desserts-with-berries-chocolate.jpg",
                "Classic New York-style cheesecake",
                9.99,
                "Dessert",
                1
              );
              menuStmt.run(
                "Fruit Sorbet",
                "desserts/assortment-pieces-cake.jpg",
                "Refreshing mixed fruit sorbet",
                5.99,
                "Dessert",
                1
              );

              // Restaurant 1 Drinks

              menuStmt.run(
                "Mojito",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Refreshing minty lime cocktail",
                6.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Red Wine",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Rich and full-bodied red wine",
                12.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Iced Latte",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Chilled espresso with milk",
                4.99,
                "Drinks",
                1
              );
              menuStmt.run(
                "Soda",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Assorted soft drinks",
                2.99,
                "Drinks",
                1
              );

              // Restaurant 1 Snacks

              menuStmt.run(
                "Bruschetta",
                "img/afif-ramdhasuma-omcpmrw4fKw-unsplash.jpg",
                "Toasted bread with tomato and basil topping",
                19.99,
                "Snacks",
                1
              );
              menuStmt.run(
                "Garlic Bread",
                "img/afif-ramdhasuma-omcpmrw4fKw-unsplash.jpg",
                "Warm bread with garlic butter",
                14.99,
                "Snacks",
                1
              );
              menuStmt.run(
                "Chicken Wings",
                "img/afif-ramdhasuma-omcpmrw4fKw-unsplash.jpg",
                "Crispy chicken wings with various sauces",
                8.99,
                "Snacks",
                1
              );
              menuStmt.run(
                "Caprese Skewers",
                "img/afif-ramdhasuma-omcpmrw4fKw-unsplash.jpg",
                "Mozzarella, tomato, and basil skewers",
                12.99,
                "Snacks",
                1
              );

              // Restaurant 2 main menu
              menuStmt.run(
                "Steak with Chimichurri",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Grilled steak with tangy chimichurri sauce",
                18.99,
                "Main Dish",
                2
              );
              menuStmt.run(
                "BBQ Ribs",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Slow-cooked BBQ ribs with smoky flavor",
                17.99,
                "Main Dish",
                2
              );
              menuStmt.run(
                "Shrimp Scampi",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Garlic butter shrimp served over pasta",
                15.99,
                "Main Dish",
                2
              );
              menuStmt.run(
                "Vegetarian Stir-Fry",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Assorted vegetables stir-fried to perfection",
                10.99,
                "Main Dish",
                2
              );

              // Restaurant 2 Dessert
              menuStmt.run(
                "Apple Pie",
                "desserts/brooke-lark-V4MBq8kue3U-unsplash.jpg",
                "Homemade apple pie with a flaky crust",
                10.99,
                "Dessert",
                2
              );
              menuStmt.run(
                "Molten Lava Cake",
                "desserts/chad-montano-eeqbbemH9-c-unsplash.jpg",
                "Warm chocolate cake with a gooey center",
                10.99,
                "Dessert",
                2
              );
              menuStmt.run(
                "Panna Cotta",
                "desserts/diana-polekhina-i5BY6W2ttts-unsplash.jpg",
                "Creamy Italian dessert with berry coulis",
                13.99,
                "Dessert",
                2
              );
              menuStmt.run(
                "Frozen Yogurt",
                "desserts/emile-mbunzama-cLpdEA23Z44-unsplash.jpg",
                "Refreshing frozen yogurt with assorted toppings",
                6.99,
                "Dessert",
                2
              );

              // Restaurant 2 Drinks

              menuStmt.run(
                "Sangria",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Fruity wine punch with assorted fruits",
                6.99,
                "Drinks",
                2
              );
              menuStmt.run(
                "Craft Beer",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Locally brewed craft beer with a variety of flavors",
                7.99,
                "Drinks",
                2
              );
              menuStmt.run(
                "Margarita",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Classic margarita with a salted rim",
                8.99,
                "Drinks",
                2
              );
              menuStmt.run(
                "Lemonade",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Freshly squeezed lemonade with a hint of mint",
                4.99,
                "Drinks",
                2
              );

              // Restaurant 2 snacks
              menuStmt.run(
                "Loaded Nachos",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Nachos topped with cheese, jalapeños, and salsa",
                8.99,
                "Snacks",
                2
              );
              menuStmt.run(
                "Mozzarella Sticks",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Crispy mozzarella sticks with marinara sauce",
                5.99,
                "Snacks",
                2
              );
              menuStmt.run(
                "Spinach Artichoke Dip",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Freshly squeezed lemonade with a hint of mint",
                9.99,
                "Snacks",
                2
              );
              menuStmt.run(
                "Garlic Fries",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Crispy fries tossed with garlic and herbs",
                7.99,
                "Snacks",
                2
              );

              // Restaurant 3 Main Dish

              menuStmt.run(
                "Quinoa Salad",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Healthy salad with quinoa, mixed greens, and vinaigrette",
                9.99,
                "Main menu",
                3
              );
              menuStmt.run(
                "Caprese Panini",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Grilled panini with mozzarella, tomato, and basil",
                8.99,
                "Main menu",
                3
              );
              menuStmt.run(
                "Vegetable Curry",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Spicy vegetable curry served with rice",
                12.99,
                "Main menu",
                3
              );
              menuStmt.run(
                "Stuffed Bell Peppers",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Bell peppers stuffed with quinoa and veggies",
                17.99,
                "Main menu",
                3
              );
              // Restaurant 3 ar Dessert

              menuStmt.run(
                "Chia Seed Pudding",
                "desserts/fernando-andrade-89h9zKa0L0g-unsplash.jpg",
                "Bell peppers stuffed with quinoa and veggies",
                18.99,
                "Dessert",
                3
              );
              menuStmt.run(
                "Chia Seed Pudding",
                "desserts/heather-ford-POM4KxWZcG8-unsplash.jpg",
                "https://example.com/fruit-parfait.jpg",
                13.99,
                "Dessert",
                3
              );
              menuStmt.run(
                "Vegan Chocolate Cake",
                "desserts/humphrey-muleba-jABXuTS1azc-unsplash.jpg",
                "Moist chocolate cake made without dairy or eggs",
                10.99,
                "Dessert",
                3
              );
              menuStmt.run(
                "Coconut Sorbet",
                "desserts/karly-gomez-lK1Q5RyD6tc-unsplash.jpg",
                "Bell peppers stuffed with quinoa and veggies",
                14.99,
                "Dessert",
                3
              );
              // Restaurant 3 Drinks
              menuStmt.run(
                "Green Smoothie",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Healthy smoothie with spinach, banana, and green fruits",
                6.99,
                "Drinks",
                3
              );
              menuStmt.run(
                "Detox Water",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Infused water with cucumber, lemon, and mint",
                11.99,
                "Drinks",
                3
              );
              menuStmt.run(
                "Herbal Tea",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Warm herbal tea with a blend of aromatic herbs",
                11.99,
                "Drinks",
                3
              );
              menuStmt.run(
                "Fresh Orange Juice",
                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
                "Squeezed orange juice, rich in Vitamin C",
                14.99,
                "Drinks",
                3
              );
              // Restaurant 3 snacks

              menuStmt.run(
                "Avocado Toast",
                "https://example.com/avocado-toast.jpg",
                "Toasted bread with mashed avocado and cherry tomatoes",
                7.99,
                "Snacks",
                3
              );
              menuStmt.run(
                "Cucumber Rolls",
                "https://example.com/cucumber-rolls.jpg",
                "Fresh cucumber rolls with cream cheese and herbs",
                6.99,
                "Snacks",
                3
              );
              menuStmt.run(
                "Kale Chips",
                "https://example.com/kale-chips.jpg",
                "Crispy kale chips with sea salt",
                5.99,
                "Snacks",
                3
              );
              menuStmt.run(
                "Edamame",
                "https://example.com/edamame.jpg",
                "Steamed edamame with sea salt",
                4.99,
                "Snacks",
                3
              );
              // Restaurant 4 Main dish
              menuStmt.run(
                "Chicken Curry",
                "https://example.com/edamame.jpg",
                "Spicy chicken curry with aromatic spices",
                12.99,
                "Main menu",
                4
              );
              menuStmt.run(
                "Paneer Tikka Masala",
                "https://example.com/edamame.jpg",
                "Paneer cubes in a creamy tomato-based sauce",
                7.99,
                "Main menu",
                4
              );
              menuStmt.run(
                "Biryani",
                "https://example.com/edamame.jpg",
                "Fragrant rice dish with meat, vegetables, and spices",
                14.99,
                "Main menu",
                4
              );
              menuStmt.run(
                "Tandoori Mixed Grill",
                "https://example.com/edamame.jpg",
                "Assorted grilled meats with tandoori spices",
                8.99,
                "Main menu",
                4
              );

              // Restaurant 4 Dessert
              menuStmt.run(
                "Gulab Jamun",
                "desserts/kobby-mendez-idTwDKt2j2o-unsplash.jpg",
                "Deep-fried dumplings in sugar syrup",
                6.99,
                "Dessert",
                4
              );
              menuStmt.run(
                "Rasmalai",
                "desserts/kobby-mendez-q54Oxq44MZs-unsplash.jpg",
                "Soft cheese dumplings in saffron-flavored milk",
                3.99,
                "Dessert",
                4
              );
              menuStmt.run(
                "Mango Lassi Popsicle",
                "desserts/lore-schodts-FIxdY7jOBus-unsplash.jpg",
                "Refreshing mango lassi in frozen popsicle form",
                2.99,
                "Dessert",
                4
              );
              menuStmt.run(
                "Kheer",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Assorted grilled meats with tandoori spices",
                5.99,
                "Dessert",
                4
              );

              // Restaurant 4 Drinks
              menuStmt.run(
                "Masala Chai",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Assorted grilled meats with tandoori spices",
                5.99,
                "Drinks",
                4
              );
              menuStmt.run(
                "Mango Lassi",
                "Drinkss/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Yogurt-based drink with fresh mango pulp",
                4.99,
                "Drinks",
                4
              );
              menuStmt.run(
                "Rose Sharbat",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Rose-flavored syrup mixed with water",
                2.99,
                "Drinks",
                4
              );
              menuStmt.run(
                "Thandai",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Cooling drink with almonds, fennel, and cardamom",
                6.99,
                "Drinks",
                4
              );
              // Restaurant 4 Snacks

              menuStmt.run(
                "Samosa",
                "https://example.com/edamame.jpg",
                "Crispy pastry filled with spiced potatoes and peas",
                1.99,
                "Snacks",
                4
              );
              menuStmt.run(
                "Chicken Pakora",
                "https://example.com/edamame.jpg",
                "Deep-fried chicken fritters with spices",
                2.99,
                "Snacks",
                4
              );
              menuStmt.run(
                "Papdi Chaat",
                "https://example.com/edamame.jpg",
                "Crunchy snack with yogurt, chutney, and spices",
                3.99,
                "Snacks",
                4
              );
              menuStmt.run(
                "Aloo Tikki",
                "https://example.com/edamame.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Snacks",
                4
              );

              //  Restaurant 5 main menu

              menuStmt.run(
                "Grilled Lobster Tail",
                "https://example.com/edamame.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                5
              );
              menuStmt.run(
                "Seafood Paella",
                "https://example.com/edamame.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                5
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "https://example.com/edamame.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                5
              );
              menuStmt.run(
                "Sushi Platter",
                "https://example.com/edamame.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                5
              );

              //  Restaurant 5 Desserts

              menuStmt.run(
                "Key Lime Pie",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                5
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/pushpak-dsilva-2UeBOL7UD34-unsplash.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                5
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/yulia-khlebnikova-FDYbS43jUrU-unsplash.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                5
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/zoom-view-little-round-cake-decorated-with-strawberries-white-plate.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                5
              );

              //  Restaurant 5 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "https://example.com/edamame.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                5
              );
              menuStmt.run(
                "Blue Lagoon",
                "https://example.com/edamame.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                5
              );
              menuStmt.run(
                "Frozen Margarita",
                "https://example.com/edamame.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                5
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "https://example.com/edamame.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                5
              );

              //  Restaurant 5 snacks

              menuStmt.run(
                "Crab Cakes",
                "https://example.com/edamame.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                5
              );
              menuStmt.run(
                "Calamari Rings",
                "https://example.com/edamame.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                5
              );
              menuStmt.run(
                "Clam Chowder",
                "https://example.com/edamame.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                5
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "https://example.com/edamame.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                5
              );

              //  Restaurant 6 main menu

              menuStmt.run(
                "Grilled Lobster Tail",
                "https://example.com/edamame.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                6
              );
              menuStmt.run(
                "Seafood Paella",
                "https://example.com/edamame.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                6
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "https://example.com/edamame.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                6
              );
              menuStmt.run(
                "Sushi Platter",
                "https://example.com/edamame.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                6
              );

              //  Restaurant 5 Desserts

              menuStmt.run(
                "Key Lime Pie",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                6
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/pushpak-dsilva-2UeBOL7UD34-unsplash.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                6
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/yulia-khlebnikova-FDYbS43jUrU-unsplash.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                6
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/zoom-view-little-round-cake-decorated-with-strawberries-white-plate.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                6
              );

              //  Restaurant 5 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "https://example.com/edamame.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                6
              );
              menuStmt.run(
                "Blue Lagoon",
                "https://example.com/edamame.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                6
              );
              menuStmt.run(
                "Frozen Margarita",
                "https://example.com/edamame.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                6
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "https://example.com/edamame.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                6
              );

              //  Restaurant 5 snacks

              menuStmt.run(
                "Crab Cakes",
                "https://example.com/edamame.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                6
              );
              menuStmt.run(
                "Calamari Rings",
                "https://example.com/edamame.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                6
              );
              menuStmt.run(
                "Clam Chowder",
                "https://example.com/edamame.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                6
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "https://example.com/edamame.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                6
              );

              //  Restaurant 7 main menu

              menuStmt.run(
                "Grilled Lobster Tail",
                "https://example.com/edamame.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                7
              );
              menuStmt.run(
                "Seafood Paella",
                "https://example.com/edamame.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                7
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "https://example.com/edamame.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                7
              );
              menuStmt.run(
                "Sushi Platter",
                "https://example.com/edamame.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                7
              );

              //  Restaurant 5 Desserts

              menuStmt.run(
                "Key Lime Pie",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                7
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/pushpak-dsilva-2UeBOL7UD34-unsplash.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                7
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/yulia-khlebnikova-FDYbS43jUrU-unsplash.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                7
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/zoom-view-little-round-cake-decorated-with-strawberries-white-plate.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                7
              );

              //  Restaurant 7 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "https://example.com/edamame.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                7
              );
              menuStmt.run(
                "Blue Lagoon",
                "https://example.com/edamame.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                7
              );
              menuStmt.run(
                "Frozen Margarita",
                "https://example.com/edamame.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                7
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "https://example.com/edamame.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                7
              );

              //  Restaurant 7 snacks

              menuStmt.run(
                "Crab Cakes",
                "https://example.com/edamame.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                7
              );
              menuStmt.run(
                "Calamari Rings",
                "https://example.com/edamame.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                7
              );
              menuStmt.run(
                "Clam Chowder",
                "https://example.com/edamame.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                7
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "https://example.com/edamame.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                7
              );

              //  Restaurant 8 main menu

              menuStmt.run(
                "Grilled Lobster Tail",
                "https://example.com/edamame.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                8
              );
              menuStmt.run(
                "Seafood Paella",
                "https://example.com/edamame.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                8
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "https://example.com/edamame.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                8
              );
              menuStmt.run(
                "Sushi Platter",
                "https://example.com/edamame.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                8
              );

              //  Restaurant 8 Desserts

              menuStmt.run(
                "Key Lime Pie",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                8
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/pushpak-dsilva-2UeBOL7UD34-unsplash.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                8
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/yulia-khlebnikova-FDYbS43jUrU-unsplash.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                8
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/zoom-view-little-round-cake-decorated-with-strawberries-white-plate.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                8
              );

              //  Restaurant 8 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "https://example.com/edamame.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                8
              );
              menuStmt.run(
                "Blue Lagoon",
                "https://example.com/edamame.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                8
              );
              menuStmt.run(
                "Frozen Margarita",
                "https://example.com/edamame.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                8
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "https://example.com/edamame.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                8
              );

              //  Restaurant 8 snacks

              menuStmt.run(
                "Crab Cakes",
                "https://example.com/edamame.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                8
              );
              menuStmt.run(
                "Calamari Rings",
                "https://example.com/edamame.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                8
              );
              menuStmt.run(
                "Clam Chowder",
                "https://example.com/edamame.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                8
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "https://example.com/edamame.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                8
              );

              //  Restaurant 9 main menu

              menuStmt.run(
                "Grilled Lobster Tail",
                "https://example.com/edamame.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                9
              );
              menuStmt.run(
                "Seafood Paella",
                "https://example.com/edamame.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                9
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "https://example.com/edamame.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                9
              );
              menuStmt.run(
                "Sushi Platter",
                "https://example.com/edamame.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                9
              );

              //  Restaurant 9 Desserts

              menuStmt.run(
                "Key Lime Pie",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Florida-style key lime pie with graham cracker crust",
                5.99,
                "Dessert",
                9
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/pushpak-dsilva-2UeBOL7UD34-unsplash.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                9
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/yulia-khlebnikova-FDYbS43jUrU-unsplash.jpg",
                "Refreshing sorbet made with fresh mangoes",
                5.99,
                "Dessert",
                9
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/zoom-view-little-round-cake-decorated-with-strawberries-white-plate.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                9
              );

              //  Restaurant 9 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "https://example.com/edamame.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                9
              );
              menuStmt.run(
                "Blue Lagoon",
                "https://example.com/edamame.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                9
              );
              menuStmt.run(
                "Frozen Margarita",
                "https://example.com/edamame.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                9
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "https://example.com/edamame.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                9
              );

              //  Restaurant 9 snacks

              menuStmt.run(
                "Crab Cakes",
                "https://example.com/edamame.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                9
              );
              menuStmt.run(
                "Calamari Rings",
                "https://example.com/edamame.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                9
              );
              menuStmt.run(
                "Clam Chowder",
                "https://example.com/edamame.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                9
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "https://example.com/edamame.jpg",
                "Sesame-crusted seared tuna bites with wasabi mayo",
                2.99,
                "Snacks",
                9
              );

              //  Restaurant 10 main menu

              menuStmt.run(
                "Grilled Lobster Tail",
                "https://example.com/edamame.jpg",
                "Butter-grilled lobster tail served with garlic butter",
                16.99,
                "Main menu",
                10
              );
              menuStmt.run(
                "Seafood Paella",
                "https://example.com/edamame.jpg",
                "Spanish rice dish with a mix of seafood",
                11.99,
                "Main menu",
                10
              );
              menuStmt.run(
                "Blackened Mahi-Mahi",
                "https://example.com/edamame.jpg",
                "Fried potato patties with mint chutney",
                9.99,
                "Main menu",
                10
              );
              menuStmt.run(
                "Sushi Platter",
                "https://example.com/edamame.jpg",
                "Assorted sushi rolls with soy sauce and wasabi",
                13.99,
                "Main menu",
                10
              );

              //  Restaurant 10 Desserts

              menuStmt.run(
                "Key Lime Pie",
                "desserts/luisana-zerpa-MJPr6nOdppw-unsplash.jpg",
                "Florida-style key lime pie with graham cracker crust",
                10.99,
                "Dessert",
                10
              );
              menuStmt.run(
                "Coconut Panna Cotta",
                "desserts/pushpak-dsilva-2UeBOL7UD34-unsplash.jpg",
                "Coconut-flavored Italian dessert with tropical fruit",
                9.99,
                "Dessert",
                10
              );
              menuStmt.run(
                "Mango Sorbet",
                "desserts/yulia-khlebnikova-FDYbS43jUrU-unsplash.jpg",
                "Refreshing sorbet made with fresh mangoes",
                10.99,
                "Dessert",
                10
              );
              menuStmt.run(
                "Chocolate Sea Shells",
                "desserts/zoom-view-little-round-cake-decorated-with-strawberries-white-plate.jpg",
                "Chocolates shaped like seashells with a smooth filling",
                6.99,
                "Dessert",
                10
              );

              //  Restaurant 10 Drinks
              menuStmt.run(
                "Pineapple Coconut Mojito",
                "https://example.com/edamame.jpg",
                "Tropical twist on the classic mojito",
                7.99,
                "Drinks",
                10
              );
              menuStmt.run(
                "Blue Lagoon",
                "https://example.com/edamame.jpg",
                "Blue curaçao cocktail with vodka and lemonade",
                4.99,
                "Drinks",
                10
              );
              menuStmt.run(
                "Frozen Margarita",
                "https://example.com/edamame.jpg",
                "Blended margarita with a salted rim",
                6.99,
                "Drinks",
                10
              );
              menuStmt.run(
                "Cucumber Mint Cooler",
                "https://example.com/edamame.jpg",
                "Cooling drink with cucumber, mint, and lime",
                12.99,
                "Drinks",
                10
              );

              //  Restaurant 10 snacks

              menuStmt.run(
                "Crab Cakes",
                "https://example.com/edamame.jpg",
                "Golden-brown crab cakes served with aioli",
                2.99,
                "Snacks",
                10
              );
              menuStmt.run(
                "Calamari Rings",
                "https://example.com/edamame.jpg",
                "Crispy calamari rings with marinara sauce",
                3.99,
                "Snacks",
                10
              );
              menuStmt.run(
                "Clam Chowder",
                "https://example.com/edamame.jpg",
                "Creamy New England clam chowder",
                7.99,
                "Snacks",
                10
              );
              menuStmt.run(
                "Seared Tuna Bites",
                "https://example.com/edamame.jpg",
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
          `CREATE TABLE users (
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
                  INSERT INTO users (first_name, last_name, email, address)
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
