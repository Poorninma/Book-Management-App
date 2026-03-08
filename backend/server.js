const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const pool = require("./config/db");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book API running...");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection error");
  }
});

app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

/*
Start server ONLY if not running tests
*/
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

/*
Export app for testing
*/
module.exports = app;