const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
  id: String,
  imageUrl: {
    type: String,
    required: true,
  },
  allImages: {
    type: Array,
    required: true,
  },
  name: String,
  description: String,
  brand: String,
  size: Array,
  color: Array,
  fit: Array,
  discountedPrice: String,
  originalPrice: String,
  discountPercentage: String,
  ratings: String,
  isInStock: {
    type: Boolean,
    required: true,
  },
  fastDelivery: Boolean,
  isTrending: Boolean,
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;