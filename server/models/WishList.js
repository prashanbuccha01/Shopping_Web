const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
