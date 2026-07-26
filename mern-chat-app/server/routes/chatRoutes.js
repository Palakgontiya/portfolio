const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Room = require('../models/Room');

const DEFAULT_ROOMS = [
  { slug: 'general', name: 'General Lounge', description: 'Open topic chat room for everyone', icon: '💬' },
  { slug: 'tech', name: 'Tech & Code', description: 'Discuss MERN, React, Node.js & Dev', icon: '⚡' },
  { slug: 'random', name: 'Random Chill', description: 'Memes, banter & random discussions', icon: '🔥' },
  { slug: 'design', name: 'UI & Design', description: 'Share UI designs, CSS & web magic', icon: '🎨' },
];

// @route GET /api/chat/rooms
// @desc Get default rooms
router.get('/rooms', async (req, res) => {
  try {
    let rooms = await Room.find();
    if (rooms.length === 0) {
      rooms = await Room.insertMany(DEFAULT_ROOMS);
    }
    return res.json({ success: true, rooms });
  } catch (error) {
    return res.json({ success: true, rooms: DEFAULT_ROOMS });
  }
});

// @route GET /api/chat/messages/:room
// @desc Fetch historical messages for a specific room
router.get('/messages/:room', async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await Message.find({ room, isPrivate: false })
      .populate('sender', 'username avatar status')
      .sort({ createdAt: 1 })
      .limit(100);

    return res.json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load messages' });
  }
});

// @route GET /api/chat/private/:user1Id/:user2Id
// @desc Fetch private message history between two users
router.get('/private/:user1Id/:user2Id', async (req, res) => {
  try {
    const { user1Id, user2Id } = req.params;
    const messages = await Message.find({
      isPrivate: true,
      $or: [
        { sender: user1Id, recipient: user2Id },
        { sender: user2Id, recipient: user1Id },
      ],
    })
      .populate('sender', 'username avatar status')
      .populate('recipient', 'username avatar status')
      .sort({ createdAt: 1 })
      .limit(100);

    return res.json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load private messages' });
  }
});

module.exports = router;
