const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const mongodbUrl = process.env.MONGO_URL;

// Connect to MongoDB
const connectDB = () => {
  mongoose
    .connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectDB;
