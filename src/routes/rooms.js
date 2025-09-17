const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// danh sách phòng
router.get("/", roomController.getRooms);

// chi tiết phòng
router.get("/:id", roomController.getRoomDetail);

module.exports = router;
