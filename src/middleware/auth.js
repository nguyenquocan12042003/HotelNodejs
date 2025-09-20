exports.isAdmin = (req, res, next) => {
  console.log("Session trong isAdmin:", req.session.user);
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.redirect("/login");
};
