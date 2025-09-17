const Room = require("../models/Room");

// Danh sách phòng
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll(); // lấy tất cả
    res.render("rooms/rooms", { layout: "layout", rooms });
  } catch (err) {
    console.error("Lỗi lấy danh sách phòng (Sequelize):", err);
    res.status(500).send("Có lỗi xảy ra khi lấy danh sách phòng");
  }
};

// Chi tiết phòng
exports.getRoomDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Room.findByPk(id);
    if (!room) return res.status(404).send("Phòng không tồn tại");
    res.render("rooms/detail", { layout: "layout", room });
  } catch (err) {
    console.error("Lỗi lấy chi tiết phòng (Sequelize):", err);
    res.status(500).send("Có lỗi xảy ra khi lấy chi tiết phòng");
  }
};
