const Product = require("./../models/Product");

// API TO FIND ALL THE PRODUCTS AND ALSO FILTERING THEM

exports.products = async (req, res) => {
  try {
    const { category, isCarousel, id } = req.query;

    // Create a filter object
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (isCarousel) {
      filter.isCarousel = true;
    }

    if (id) {
      filter._id = id;
    }

    // Fetch products based on the filter
    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// API TO FIND ALL THE CATEGORIES AND THEIR PRODUCT NUMBERS

exports.categories = async (req, res) => {
  try {
    // Aggregate products to get distinct categories and count of products in each category
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// app.post("/api/products", async (req, res) => {
//   try {
//     // Read data from the JSON file
//     const rawData = fs.readFileSync("products.json");
//     const products = JSON.parse(rawData);

//     // Save each product in the database
//     for (const productData of products) {
//       const product = new Product(productData);
//       await product.save();
//     }

//     res.status(201).json({ message: "Products saved successfully" });
//   } catch (error) {
//     console.error("Error saving products:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });