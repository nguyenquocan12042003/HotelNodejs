const bcrypt = require("bcryptjs"); // dùng bcryptjs
const db = require("../config/db"); // kết nối MySQL

// Hiển thị form
exports.showRegister = (req, res) => {
  res.render("auth/register", { layout: "layout" });
};

exports.showLogin = (req, res) => {
  res.render("auth/login", { layout: "layout" });
};

// Đăng ký
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    await db.execute(sql, [name, email, hashedPassword]);

    res.redirect("/login"); // sau khi đăng ký xong quay lại login
  } catch (err) {
    console.error(err);
    res.status(500).send("Có lỗi xảy ra khi đăng ký");
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).send("Email không tồn tại");
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Sai mật khẩu");
    }

    // Lưu thông tin user vào session
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Có lỗi xảy ra khi đăng nhập");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
