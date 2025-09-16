const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",      // XAMPP MySQL
  user: "root",           // tài khoản mặc định XAMPP
  password: "",           // mặc định thường để trống
  database: "hotel_db", // tên database bạn đã tạo
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
