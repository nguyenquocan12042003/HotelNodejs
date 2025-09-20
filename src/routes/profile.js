const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login'); // Chưa đăng nhập, chuyển hướng về login
    }

    const user = await User.findByPk(req.session.user.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Loại bỏ password khỏi dữ liệu gửi đến view
    const { password, ...userData } = user.toJSON();
    res.render('profile', { user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;