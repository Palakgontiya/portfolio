import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Sparkles } from 'lucide-react';

const AVATAR_OPTIONS = ['⚡', '🚀', '🔥', '🎨', '💻', '🦊', '🐱', '🤖', '👑', '🌈'];

export const LoginModal = () => {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('⚡');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    await loginUser(username.trim(), avatar);
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-icon">💬</span>
          <h1 className="login-title">PulseChat</h1>
        </div>
        <p className="login-subtitle">Real-time MERN Stack & Socket.io Experience</p>

        <form onSubmit={handleSubmit}>
          <label className="avatar-picker-label">Choose your avatar</label>
          <div className="avatar-grid">
            {AVATAR_OPTIONS.map((emoji) => (
              <button
                type="button"
                key={emoji}
                className={`avatar-option ${avatar === emoji ? 'active' : ''}`}
                onClick={() => setAvatar(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>

          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              className="custom-input"
              placeholder="e.g. AlexDev or Sarah"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              maxLength={20}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading || !username.trim()}>
            {loading ? (
              <span>Connecting...</span>
            ) : (
              <>
                <span>Enter Chat</span>
                <Sparkles size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
