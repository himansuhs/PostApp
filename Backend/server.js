const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { connectDB } = require("./config");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://post-app-yw1z.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// MongoDB Connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
