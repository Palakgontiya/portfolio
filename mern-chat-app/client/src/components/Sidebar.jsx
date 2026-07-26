import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { LogOut, Radio } from 'lucide-react';

export const Sidebar = () => {
  const { user, logoutUser } = useAuth();
  const { rooms, activeRoom, activePrivateUser, onlineUsers, unreadCounts, joinRoom, selectPrivateUser } = useSocket();

  // Filter out current logged in user from DMs list
  const otherUsers = onlineUsers.filter(
    (u) => u.username?.toLowerCase() !== user?.username?.toLowerCase()
  );

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand">
          <span style={{ fontSize: '1.4rem' }}>💬</span>
          <span className="brand-title">PulseChat</span>
        </div>
        <button
          onClick={logoutUser}
          className="emoji-btn"
          title="Sign Out"
          style={{ width: '34px', height: '34px', fontSize: '0.9rem' }}
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Current User Badge */}
      {user && (
        <div className="user-profile-badge">
          <div className="user-avatar-circle">
            <span>{user.avatar || '⚡'}</span>
            <span className="online-dot" />
          </div>
          <div className="user-details">
            <div className="user-name">{user.username}</div>
            <div className="user-status-text">
              <Radio size={12} />
              <span>Online Now</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Scrollable */}
      <div className="sidebar-scroll">
        {/* Rooms Section */}
        <div className="section-title">Public Channels</div>
        <ul className="nav-list">
          {rooms.map((r) => {
            const isActive = activeRoom === r.slug && !activePrivateUser;
            const unread = unreadCounts[r.slug] || 0;
            return (
              <li
                key={r.slug}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => joinRoom(r.slug)}
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="nav-icon">{r.icon || '#'}</span>
                  <span>{r.name}</span>
                </div>
                {unread > 0 && (
                  <span
                    style={{
                      background: 'var(--primary)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      boxShadow: '0 0 10px rgba(99, 102, 241, 0.6)',
                    }}
                  >
                    {unread}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* Online Users Section */}
        <div className="section-title" style={{ marginTop: '12px' }}>
          <span>Online Users ({otherUsers.length})</span>
        </div>
        <ul className="nav-list">
          {otherUsers.map((u) => {
            const isDMActive = activePrivateUser?.username?.toLowerCase() === u.username?.toLowerCase();
            const isOnline = u.status === 'online';
            const unread = unreadCounts[u._id] || 0;

            return (
              <li
                key={u._id}
                className={`nav-item ${isDMActive ? 'active' : ''}`}
                onClick={() => selectPrivateUser(u)}
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="nav-icon" style={{ position: 'relative' }}>
                    {u.avatar || '⚡'}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-4px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isOnline ? 'var(--online-color)' : 'var(--offline-color)',
                        border: '1px solid #0f172a',
                      }}
                    />
                  </span>
                  <span>{u.username}</span>
                </div>

                {unread > 0 && (
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      boxShadow: '0 0 10px rgba(217, 70, 239, 0.6)',
                    }}
                  >
                    {unread}
                  </span>
                )}
              </li>
            );
          })}
          {otherUsers.length === 0 && (
            <li className="nav-item" style={{ fontSize: '0.8rem', color: 'var(--text-dim)', cursor: 'default' }}>
              No other users online yet. Open a second window to test live messaging!
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};
