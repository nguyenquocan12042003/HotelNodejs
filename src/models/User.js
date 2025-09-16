const pool = require("../config/db");

async function createUser(name, email, password) {
  const [rows] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return rows.insertId;
}

module.exports = { createUser };
