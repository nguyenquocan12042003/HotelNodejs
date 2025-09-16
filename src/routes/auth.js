const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Hiển thị form đăng ký
router.get("/register", authController.showRegister);

// Xử lý đăng ký
router.post("/register", authController.register);

// Hiển thị form đăng nhập
router.get("/login", authController.showLogin);

// Xử lý đăng nhập
router.post("/login", authController.login);

// Xử lý đăng xuất
router.get("/logout", authController.logout);

module.exports = router;
