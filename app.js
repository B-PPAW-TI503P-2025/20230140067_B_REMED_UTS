const path = require("path");
const express = require("express");
const sequelize = require("./config/database");

// Models (biar Sequelize aware)
require("./models/User");
require("./models/Book");
require("./models/BorrowLog");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

const app = express();
app.use(express.json());

// Static frontend
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", authRoutes);          // /api/register, /api/login
app.use("/api/books", bookRoutes);    // public + admin
app.use("/api/borrow", borrowRoutes); // user

// default route -> login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    // Karena kamu bikin tabel manual, ini aman selama struktur sama:
    // - tableName cocok (Users, Books, BorrowLogs)
    // - ada createdAt/updatedAt
    await sequelize.sync({ alter: false });
    console.log("✅ Sequelize ready");

    app.listen(3000, () => console.log("🚀 http://localhost:3000"));
  } catch (err) {
    console.error("❌ DB Error:", err.message);
  }
})();
