const express = require("express");
const cors = require("cors");

const restaurantsRouter = require("./routes/restaurantsRouter.js");
const ordersRouter = require("./routes/ordersRouter.js");
const customersRouter = require("./routes/customersRouter.js");

const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static("public"));

app.use(restaurantsRouter);
app.use(ordersRouter);
app.use(customersRouter);

// Handle unknown routes with a 404 response
app.all("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});
