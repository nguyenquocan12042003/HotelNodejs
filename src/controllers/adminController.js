const sequelize = require("../config/db");

// Trang dashboard
exports.dashboard = (req, res) => {
  res.render("admin/dashboard", {
    layout: "layouts/admin",
    title: "Bảng điều khiển",
    user: req.session.user
  });
};

// Quản lý phòng
exports.getRooms = async (req, res) => {
  try {
    const [rooms] = await sequelize.query("SELECT * FROM rooms");
    res.render("admin/rooms", {
      layout: "layouts/admin",
      title: "Danh sách phòng",
      user: req.session.user,
      rooms
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy danh sách phòng");
  }
};

exports.showAddRoom = (req, res) => {
  res.render("admin/rooms/add", {
    layout: "layouts/admin",
    title: "Thêm phòng",
    user: req.session.user
  });
};

exports.addRoom = async (req, res) => {
  const { name, type, price, status, description, image } = req.body;
  try {
    await sequelize.query(
      `INSERT INTO rooms (name, type, price, status, description, image, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      {
        replacements: [name, type, price, status, description, image],
      }
    );

    // Thêm flash message
    req.flash("success_msg", "Thêm phòng thành công!");
    res.redirect("/admin/rooms");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Có lỗi khi thêm phòng!");
    res.redirect("/admin/rooms/add");
  }
};


exports.showEditRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await sequelize.query("SELECT * FROM rooms WHERE id = ?", {
      replacements: [id],
    });
    if (rows.length === 0) return res.status(404).send("Không tìm thấy phòng");
    res.render("admin/edit-room", {
      layout: "layouts/admin",
      title: "Chỉnh sửa phòng",
      user: req.session.user,
      room: rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi lấy dữ liệu phòng");
  }
};
exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    await sequelize.query(
      "UPDATE rooms SET name = ?, price = ?, image = ? WHERE id = ?",
      {
        replacements: [name, price, image, id],
      }
    );
    res.redirect("/admin/rooms");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi cập nhật phòng");
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query("DELETE FROM rooms WHERE id = ?", {
      replacements: [id],
    });
    res.redirect("/admin/rooms");
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xóa phòng");
  }
};
