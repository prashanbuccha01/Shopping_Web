const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actual_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  discount_percent: {
    type: Number,
    required: true,
  },
  discounted_price: {
    type: Number,
    required: true,
  },
  isCarousel: {
    type: Boolean,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  product_main_image: {
    type: String,
    required: true,
  },
  other_angle_product_images: {
    type: [String],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
