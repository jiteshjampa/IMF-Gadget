require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    process.exit(1); // Exit process on DB failure
  }
};
connectDB();

// JWT Login Route (For Testing)
app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username required" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Routes
app.use("/gadgets", require("./routes/gadgetRoutes"));

// Root Route
app.get("/", (req, res) => {
  res.send("🔹 IMF Gadget API is Live! 🔹");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await sequelize.close();
  console.log("🔌 Database connection closed");
  process.exit(0);
});
module.exports = app;
