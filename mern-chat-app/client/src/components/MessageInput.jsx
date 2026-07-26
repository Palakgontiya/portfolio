import React, { useState, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { Send, Smile } from 'lucide-react';

const EMOJI_LIST = ['👍', '❤️', '🔥', '🚀', '😄', '🎉', '💯', '✨', '🙌', '💡'];

export const MessageInput = () => {
  const { sendMessage, startTyping, stopTyping, activeRoom, activePrivateUser } = useSocket();
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);

    startTyping();

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 1500);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    sendMessage(text);
    setText('');
    stopTyping();
    setShowEmojiPicker(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  const insertEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const targetName = activePrivateUser ? `@${activePrivateUser.username}` : `#${activeRoom}`;

  return (
    <div className="input-container">
      {/* Emoji Bar Popover */}
      {showEmojiPicker && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '10px 14px',
            background: '#1e293b',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            marginBottom: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          }}
        >
          {EMOJI_LIST.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => insertEmoji(emoji)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.4rem',
                cursor: 'pointer',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.25)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSend} className="chat-form">
        <button
          type="button"
          className="emoji-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          title="Pick Emoji"
        >
          <Smile size={20} />
        </button>

        <input
          type="text"
          className="chat-input"
          placeholder={`Send a message to ${targetName}...`}
          value={text}
          onChange={handleTextChange}
        />

        <button type="submit" className="send-btn" disabled={!text.trim()} title="Send Message">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
