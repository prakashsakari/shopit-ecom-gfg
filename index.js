const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const PORT = 3000;
const connectDB = require("./config/dbconfig");
const {
  postAllProducts,
  getAllProducts,
} = require("./controllers/products.controllers");
const { signup, login } = require("./controllers/auth.controller");
const {
  createWishlist,
  deleteWishlist,
  getAllWishlist,
} = require("./controllers/wishlist.controller");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.post("/", postAllProducts);

app.get("/api/products", getAllProducts);

app.post("/api/auth/signup", signup);

app.post("/api/auth/login", login);

app.get("/api/wishlist", getAllWishlist);

app.post("/api/wishlist", createWishlist);

app.delete("/api/wishlist/:id", deleteWishlist);

mongoose.connection.once("open", () => {
  console.log("connected with DB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
