import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { MessageInput } from './MessageInput';
import { Hash, User, ShieldCheck } from 'lucide-react';

export const ChatArea = () => {
  const { user } = useAuth();
  const { rooms, activeRoom, activePrivateUser, messages, typingStatus } = useSocket();
  const messagesEndRef = useRef(null);

  const currentRoomObj = rooms.find((r) => r.slug === activeRoom);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingStatus]);

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main className="chat-main">
      {/* Header */}
      <header className="chat-header">
        <div className="chat-header-info">
          <div className="chat-header-icon">
            {activePrivateUser ? (
              <span>{activePrivateUser.avatar || '👤'}</span>
            ) : (
              <span>{currentRoomObj?.icon || '💬'}</span>
            )}
          </div>
          <div>
            <div className="chat-header-title">
              {activePrivateUser ? `@${activePrivateUser.username}` : `#${currentRoomObj?.name || activeRoom}`}
            </div>
            <div className="chat-header-desc">
              {activePrivateUser
                ? `Private Direct Message (${activePrivateUser.status})`
                : currentRoomObj?.description || 'Public Discussion Channel'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <ShieldCheck size={16} color="var(--primary)" />
          <span>Real-time persistence</span>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="messages-timeline">
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✨</div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>No messages yet</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Say hi to kickstart the conversation!
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOutgoing = msg.senderUsername === user?.username || msg.sender?._id === user?._id;

            return (
              <div
                key={msg._id || index}
                className={`message-wrapper ${isOutgoing ? 'outgoing' : 'incoming'}`}
              >
                <div className="message-avatar">
                  {msg.senderAvatar || msg.sender?.avatar || '⚡'}
                </div>
                <div className="message-content">
                  {!isOutgoing && (
                    <div className="message-sender-name">
                      {msg.senderUsername || msg.sender?.username}
                    </div>
                  )}
                  <div className="message-bubble">{msg.text}</div>
                  <div className="message-time">{formatTime(msg.createdAt)}</div>
                </div>
              </div>
            );
          })
        )}

        {/* Live Typing Banner */}
        {typingStatus && typingStatus !== user?.username && (
          <div className="typing-indicator-bar">
            <span>{typingStatus} is typing</span>
            <div className="dots-flashing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <MessageInput />
    </main>
  );
};
