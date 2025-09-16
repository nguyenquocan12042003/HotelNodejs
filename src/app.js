const express = require("express");
const path = require("path");
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const session = require("express-session");

// Middleware đọc JSON từ body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder chứa CSS/JS/images
app.use(express.static(path.join(__dirname, "../public")));

// Cấu hình EJS + Layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout"); // file layout.ejs trong thư mục views

// Cấu hình session
app.use(session({
  secret: "secret_key", // đổi thành key bảo mật
  resave: false,
  saveUninitialized: false
}));

// Middleware để gán user vào res.locals
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Gán user từ session, nếu không có thì trả về null
  next();
});

const authRoutes = require("./routes/auth");

// Routes
app.use("/", routes);
app.use("/", authRoutes);

module.exports = app;