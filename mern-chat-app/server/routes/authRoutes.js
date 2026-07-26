const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route POST /api/auth/login
// @desc Login or register user
router.post('/login', async (req, res) => {
  try {
    const { username, avatar } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    let user = await User.findOne({ username: username.trim() });
    if (!user) {
      user = await User.create({
        username: username.trim(),
        avatar: avatar || '⚡',
        status: 'online',
      });
    } else {
      user.status = 'online';
      if (avatar) user.avatar = avatar;
      user.lastSeen = new Date();
      await user.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error('Login route error:', error);
    return res.status(500).json({ error: 'Server error during authentication' });
  }
});

// @route GET /api/auth/users
// @desc Get all registered/online users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ status: -1, updatedAt: -1 });
    return res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
