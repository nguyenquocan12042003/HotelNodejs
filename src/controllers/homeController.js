const e = require("express");

exports.index = (req, res) => {
  res.render("index", { title: "Trang chủ" });
};

exports.rooms = (req, res) => {
  res.render("rooms", { title: "Danh sách phòng" });
};

exports.contact = (req, res) => {
  res.render("contact", { title: "Liên hệ" });
};
