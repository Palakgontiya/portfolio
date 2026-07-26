const User = require('../models/User');
const Message = require('../models/Message');

const activeUsers = new Map(); // socketId -> userObj

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 New client socket connected: ${socket.id}`);

    // User online registration
    socket.on('user_online', async (userData) => {
      try {
        if (!userData || !userData.username) return;

        const cleanUsername = userData.username.trim();
        const usernameRegex = new RegExp(`^${cleanUsername}$`, 'i');

        let user = await User.findOne({ username: usernameRegex });

        if (!user) {
          user = await User.create({
            username: cleanUsername,
            avatar: userData.avatar || '⚡',
            status: 'online',
            socketId: socket.id,
            lastSeen: new Date(),
          });
        } else {
          user.status = 'online';
          user.socketId = socket.id;
          if (userData.avatar) user.avatar = userData.avatar;
          user.lastSeen = new Date();
          await user.save();
        }

        const userIdStr = user._id.toString();
        const userRoomStr = `user:${cleanUsername.toLowerCase()}`;

        socket.join(userIdStr);
        socket.join(userRoomStr);
        activeUsers.set(socket.id, user);

        console.log(`👤 Socket ${socket.id} registered as online user: ${cleanUsername} (joined rooms: ${userIdStr}, ${userRoomStr})`);

        // Send verified DB user object back to client so client has up-to-date _id
        socket.emit('user_authenticated', user);

        // Broadcast to all clients updated user list
        const allUsers = await User.find().sort({ status: -1, updatedAt: -1 });
        io.emit('online_users_updated', allUsers);
      } catch (err) {
        console.error('Error on user_online:', err);
      }
    });

    // Join room channel event
    socket.on('join_room', ({ room, user }) => {
      if (room) {
        socket.join(room);
        socket.to(room).emit('user_joined_room', {
          user: user?.username || 'Someone',
          room,
          time: new Date(),
        });
      }
    });

    // Send public room message
    socket.on('send_message', async (data) => {
      try {
        const { senderId, senderUsername, senderAvatar, room, text } = data;
        if (!text || !text.trim()) return;

        let dbSender = senderUsername ? await User.findOne({ username: new RegExp(`^${senderUsername.trim()}$`, 'i') }) : null;
        const validSenderId = dbSender ? dbSender._id : senderId;

        const newMessage = await Message.create({
          sender: validSenderId,
          senderUsername: senderUsername || 'Anonymous',
          senderAvatar: senderAvatar || '⚡',
          room: room || 'general',
          text: text.trim(),
          isPrivate: false,
        });

        const populatedMsg = await newMessage.populate('sender', 'username avatar status');

        // Broadcast to all clients in room
        io.to(room).emit('receive_message', populatedMsg);
      } catch (err) {
        console.error('Error saving/sending message:', err);
      }
    });

    // Send private 1-on-1 direct message
    socket.on('send_private_message', async (data) => {
      try {
        const { senderId, senderUsername, senderAvatar, recipientId, recipientUsername, text } = data;
        if (!text || !text.trim()) return;

        let dbSender = senderUsername ? await User.findOne({ username: new RegExp(`^${senderUsername.trim()}$`, 'i') }) : null;
        if (!dbSender && senderId) {
          dbSender = await User.findById(senderId);
        }

        let dbRecipient = recipientUsername ? await User.findOne({ username: new RegExp(`^${recipientUsername.trim()}$`, 'i') }) : null;
        if (!dbRecipient && recipientId) {
          dbRecipient = await User.findById(recipientId);
        }

        if (!dbSender || !dbRecipient) {
          console.warn('⚠️ Sender or recipient missing during private message:', { senderUsername, recipientUsername });
          return;
        }

        const newMessage = await Message.create({
          sender: dbSender._id,
          senderUsername: dbSender.username,
          senderAvatar: senderAvatar || dbSender.avatar || '⚡',
          recipient: dbRecipient._id,
          text: text.trim(),
          isPrivate: true,
        });

        const populatedMsg = await newMessage
          .populate('sender', 'username avatar status')
          .populate('recipient', 'username avatar status');

        const senderRoomId = dbSender._id.toString();
        const recipientRoomId = dbRecipient._id.toString();
        const senderNameRoom = `user:${dbSender.username.toLowerCase()}`;
        const recipientNameRoom = `user:${dbRecipient.username.toLowerCase()}`;

        const targetRooms = [senderRoomId, recipientRoomId, senderNameRoom, recipientNameRoom];
        const uniqueRooms = [...new Set(targetRooms)];

        console.log(`💬 Private message from ${dbSender.username} to ${dbRecipient.username}. Broadcasting to rooms:`, uniqueRooms);

        uniqueRooms.forEach((targetRoom) => {
          if (targetRoom) {
            io.to(targetRoom).emit('receive_private_message', populatedMsg);
          }
        });
      } catch (err) {
        console.error('Error sending private message:', err);
      }
    });

    // Typing indicators
    socket.on('typing_start', ({ room, recipientId, recipientUsername, username }) => {
      if (recipientUsername) {
        io.to(`user:${recipientUsername.toLowerCase()}`).emit('user_typing', { username, isTyping: true });
      } else if (recipientId) {
        io.to(recipientId.toString()).emit('user_typing', { username, isTyping: true });
      } else if (room) {
        socket.to(room).emit('user_typing', { username, isTyping: true, room });
      }
    });

    socket.on('typing_stop', ({ room, recipientId, recipientUsername, username }) => {
      if (recipientUsername) {
        io.to(`user:${recipientUsername.toLowerCase()}`).emit('user_typing', { username, isTyping: false });
      } else if (recipientId) {
        io.to(recipientId.toString()).emit('user_typing', { username, isTyping: false });
      } else if (room) {
        socket.to(room).emit('user_typing', { username, isTyping: false, room });
      }
    });

    // Disconnect event
    socket.on('disconnect', async () => {
      const user = activeUsers.get(socket.id);
      activeUsers.delete(socket.id);

      if (user) {
        try {
          await User.findByIdAndUpdate(user._id, {
            status: 'offline',
            socketId: null,
            lastSeen: new Date(),
          });

          const allUsers = await User.find().sort({ status: -1, updatedAt: -1 });
          io.emit('online_users_updated', allUsers);
        } catch (err) {
          console.error('Error updating user on disconnect:', err);
        }
      }
    });
  });
};
