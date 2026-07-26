import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

const SOCKET_SERVER_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5001' 
  : window.location.origin;

// Helper to play synthesized notification chime using Web Audio API
const playNotificationSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeRoom, setActiveRoom] = useState('general');
  const [activePrivateUser, setActivePrivateUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [notificationToast, setNotificationToast] = useState(null);

  const activeRoomRef = useRef(activeRoom);
  const activePrivateUserRef = useRef(activePrivateUser);

  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  useEffect(() => {
    activePrivateUserRef.current = activePrivateUser;
  }, [activePrivateUser]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      autoConnect: true,
      reconnectionAttempts: 10,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch rooms list from API
  useEffect(() => {
    fetch('/api/chat/rooms')
      .then((res) => res.json())
      .then((data) => {
        if (data.rooms) setRooms(data.rooms);
      })
      .catch(console.error);
  }, []);

  // Handle user online registration and socket events
  useEffect(() => {
    if (!socket || !user) return;

    socket.emit('user_online', user);

    const handleConnect = () => {
      socket.emit('user_online', user);
    };

    socket.on('connect', handleConnect);

    socket.on('online_users_updated', (users) => {
      setOnlineUsers(users);
    });

    // Public room message listener
    socket.on('receive_message', (msg) => {
      const currentRoom = activeRoomRef.current;
      const currentPrivateUser = activePrivateUserRef.current;

      const msgSenderName = (msg.senderUsername || msg.sender?.username || '').toLowerCase();
      const currentUserName = (user.username || '').toLowerCase();

      // If user is currently viewing this public room
      if (!currentPrivateUser && currentRoom === msg.room) {
        setMessages((prev) => {
          if (prev.some((m) => m._id && m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      } else if (msgSenderName !== currentUserName) {
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.room]: (prev[msg.room] || 0) + 1,
        }));

        playNotificationSound();
        setNotificationToast({
          id: Date.now(),
          title: `#${msg.room}`,
          sender: msg.senderUsername || msg.sender?.username || 'Someone',
          text: msg.text,
          avatar: msg.senderAvatar || msg.sender?.avatar || '💬',
        });
      }
    });

    // Private DM listener
    socket.on('receive_private_message', (msg) => {
      const currentPrivateUser = activePrivateUserRef.current;

      const currentUserName = (user.username || '').toLowerCase();
      const msgSenderName = (msg.senderUsername || msg.sender?.username || '').toLowerCase();
      const msgRecipientName = (msg.recipientUsername || msg.recipient?.username || '').toLowerCase();

      const activePartnerName = currentPrivateUser ? currentPrivateUser.username.toLowerCase() : null;

      // Check if message belongs to active DM conversation by username or ID
      const isCurrentDM =
        activePartnerName &&
        ((msgSenderName === currentUserName && msgRecipientName === activePartnerName) ||
         (msgSenderName === activePartnerName && msgRecipientName === currentUserName));

      if (isCurrentDM) {
        setMessages((prev) => {
          if (prev.some((m) => m._id && m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      } else {
        // Not currently open: update unread counts & notify if message was sent TO current user
        if (msgSenderName !== currentUserName) {
          const unreadKey = msg.sender?._id || msgSenderName;
          setUnreadCounts((prev) => ({
            ...prev,
            [unreadKey]: (prev[unreadKey] || 0) + 1,
          }));

          playNotificationSound();
          setNotificationToast({
            id: Date.now(),
            title: `Direct Message`,
            sender: msg.senderUsername || msg.sender?.username || 'Someone',
            text: msg.text,
            avatar: msg.senderAvatar || msg.sender?.avatar || '👤',
          });
        }
      }
    });

    socket.on('user_typing', (data) => {
      if (data.isTyping) {
        setTypingStatus(data.username);
      } else {
        setTypingStatus(null);
      }
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('online_users_updated');
      socket.off('receive_message');
      socket.off('receive_private_message');
      socket.off('user_typing');
    };
  }, [socket, user]);

  // Auto-clear notification toast after 4 seconds
  useEffect(() => {
    if (!notificationToast) return;
    const timer = setTimeout(() => setNotificationToast(null), 4000);
    return () => clearTimeout(timer);
  }, [notificationToast]);

  // Join Room & clear unreads
  const joinRoom = (roomSlug) => {
    setActivePrivateUser(null);
    setActiveRoom(roomSlug);
    setMessages([]);

    setUnreadCounts((prev) => ({ ...prev, [roomSlug]: 0 }));

    if (socket && user) {
      socket.emit('join_room', { room: roomSlug, user });
    }

    fetch(`/api/chat/messages/${roomSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) setMessages(data.messages);
      })
      .catch(console.error);
  };

  // Select User for Private Message & clear unreads
  const selectPrivateUser = (targetUser) => {
    if (!user) return;
    setActiveRoom(null);
    setActivePrivateUser(targetUser);
    setMessages([]);

    const unreadKey1 = targetUser._id;
    const unreadKey2 = targetUser.username.toLowerCase();
    setUnreadCounts((prev) => ({ ...prev, [unreadKey1]: 0, [unreadKey2]: 0 }));

    fetch(`/api/chat/private/${user._id}/${targetUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) setMessages(data.messages);
      })
      .catch(console.error);
  };

  // Initial load default room messages
  useEffect(() => {
    if (activeRoom && user) {
      joinRoom(activeRoom);
    }
  }, [user]);

  // Send message method
  const sendMessage = (text) => {
    if (!text.trim() || !user || !socket) return;

    if (activePrivateUser) {
      socket.emit('send_private_message', {
        senderId: user._id,
        senderUsername: user.username,
        senderAvatar: user.avatar,
        recipientId: activePrivateUser._id,
        recipientUsername: activePrivateUser.username,
        text,
      });
    } else if (activeRoom) {
      socket.emit('send_message', {
        senderId: user._id,
        senderUsername: user.username,
        senderAvatar: user.avatar,
        room: activeRoom,
        text,
      });
    }
  };

  // Typing event handlers
  const startTyping = () => {
    if (!socket || !user) return;
    if (activePrivateUser) {
      socket.emit('typing_start', {
        recipientId: activePrivateUser._id,
        recipientUsername: activePrivateUser.username,
        username: user.username,
      });
    } else if (activeRoom) {
      socket.emit('typing_start', { room: activeRoom, username: user.username });
    }
  };

  const stopTyping = () => {
    if (!socket || !user) return;
    if (activePrivateUser) {
      socket.emit('typing_stop', {
        recipientId: activePrivateUser._id,
        recipientUsername: activePrivateUser.username,
        username: user.username,
      });
    } else if (activeRoom) {
      socket.emit('typing_stop', { room: activeRoom, username: user.username });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        rooms,
        activeRoom,
        activePrivateUser,
        messages,
        typingStatus,
        unreadCounts,
        notificationToast,
        setNotificationToast,
        joinRoom,
        selectPrivateUser,
        sendMessage,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
