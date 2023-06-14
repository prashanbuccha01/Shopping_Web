const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
var cookieParser = require('cookie-parser')

// Connect DB
connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use("/api/auth", require("./routes/auth"));
app.use("/api", require("./routes/product"));
app.use("/cart", require("./routes/userCart"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = 8000;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error ${err}`);
  server.close(() => process.exit(1));
});
