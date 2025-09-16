const express = require("express");

const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/rooms", homeController.rooms);
router.get("/contact", homeController.contact);

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Đăng nhập" });
});

router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Đăng ký" });
});

module.exports = router;
