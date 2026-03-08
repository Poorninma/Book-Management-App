const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bookdb",
  password: "csd@123", // replace with your postgres password
  port: 5432,
  options: "-c search_path=public"
});

module.exports = pool;
