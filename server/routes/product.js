const express = require("express");
const router = express.Router();

const { products, categories } = require("./../controllers/product");

router.route("/products").get(products);

router.route("/categories").get(categories);

module.exports = router;
