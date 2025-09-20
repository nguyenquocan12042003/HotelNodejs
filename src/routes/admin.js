// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isAdmin } = require("../middleware/auth");

// Admin Dashboard
router.get("/", isAdmin, adminController.dashboard);

// Quản lý phòng
router.get("/rooms", isAdmin, adminController.getRooms);
router.get("/rooms/add", isAdmin, adminController.showAddRoom);
router.post("/rooms/add", isAdmin, adminController.addRoom);
router.get("/rooms/edit/:id", isAdmin, adminController.showEditRoom);
router.post("/rooms/edit/:id", isAdmin, adminController.updateRoom);
router.get("/rooms/delete/:id", isAdmin, adminController.deleteRoom);

module.exports = router;
