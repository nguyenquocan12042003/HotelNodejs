const express = require("express");
const path = require("path");
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

// Middleware đọc JSON từ body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder chứa CSS/JS/images
app.use(express.static(path.join(__dirname, "../public")));

// Cấu hình EJS + Layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// Layout mặc định (cho user)
app.set("layout", "layouts/main"); // tạo file views/layouts/main.ejs

// Cấu hình session
app.use(
  session({
    secret: "secret_key", // đổi thành key bảo mật
    resave: false,
    saveUninitialized: false,
  })
);
// Cấu hình flash messages
app.use(flash());
// Middleware để sử dụng flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
// Middleware để gán user vào res.locals
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Gán user từ session
  next();
});

// Import routes
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/rooms");
const profileRoutes = require("./routes/profile");
const adminRoutes = require("./routes/admin");

// Routes
app.use("/", routes);
app.use("/", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
