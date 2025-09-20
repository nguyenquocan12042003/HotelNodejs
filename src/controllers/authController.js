const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Hiển thị form đăng ký
exports.showRegister = (req, res) => {
  res.render('register'); // Giả sử bạn dùng EJS và có file register.ejs
};

// Hiển thị form đăng nhập
exports.showLogin = (req, res) => {
  res.render('login'); // Giả sử bạn dùng EJS và có file login.ejs
};

// Xử lý đăng ký
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Có lỗi xảy ra khi đăng ký");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send("Email không tồn tại");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Sai mật khẩu");

    // Gán session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("User logged in:", user.toJSON());
    console.log("Session (before save):", req.session.user);

    // Đảm bảo session lưu xong rồi mới redirect
    req.session.save((err) => {
      if (err) {
        console.error("Lỗi lưu session:", err);
        return res.status(500).send("Không thể lưu session");
      }

      if (user.role === "admin") {
        console.log("Redirecting to /admin");
        return res.redirect("/admin");
      }

      res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Có lỗi xảy ra khi đăng nhập");
  }
};


// Xử lý đăng xuất
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Có lỗi xảy ra khi đăng xuất");
    }
    res.redirect("/login");
  });
};

module.exports = exports;