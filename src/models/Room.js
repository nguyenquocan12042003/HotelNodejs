const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Room = sequelize.define("Room", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  image: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT } // để hiện chi tiết phòng
}, {
  tableName: "rooms",
  timestamps: false
});

module.exports = Room;
