const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hotel_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // tắt log SQL nếu không cần
});

module.exports = sequelize;
