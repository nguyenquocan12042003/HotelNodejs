const e = require("express");
const Room = require("../models/Room");

exports.index = async (req, res) => {
  try {
    const rooms = await Room.findAll({ limit: 6 });
    res.render("index", { title: "Trang chủ", rooms });
  } catch (error) {
    console.error("Lỗi lấy phòng:", error);
    res.status(500).send("Có lỗi xảy ra khi tải trang chủ");
  }
};

exports.rooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.render("rooms/rooms", { title: "Danh sách phòng", rooms });
  } catch (error) {
    console.error("Lỗi lấy danh sách phòng:", error);
    res.status(500).send("Có lỗi xảy ra khi tải danh sách phòng");
  }
};

exports.roomDetail = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).send("Không tìm thấy phòng");
    }
    res.render("rooms/detail", { title: room.name, room });
  } catch (error) {
    console.error("Lỗi lấy chi tiết phòng:", error);
    res.status(500).send("Có lỗi xảy ra khi tải chi tiết phòng");
  }
};

exports.contact = (req, res) => {
  res.render("contact", { title: "Liên hệ" });
};

exports.frofile = (req, res) => {
  res.render("frofile", { title: "Thông tin cá nhân" });
};