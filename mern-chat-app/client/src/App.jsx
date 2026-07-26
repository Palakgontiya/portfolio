import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider, useSocket } from './context/SocketContext';
import { LoginModal } from './components/LoginModal';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { X } from 'lucide-react';

const ToastBanner = () => {
  const { notificationToast, setNotificationToast } = useSocket();

  if (!notificationToast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '24px',
        zIndex: 9999,
        background: '#1e293b',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        borderRadius: '16px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99, 102, 241, 0.3)',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '360px',
      }}
    >
      <div
        style={{
          fontSize: '1.5rem',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {notificationToast.avatar || '💬'}
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {notificationToast.title}
        </div>
        <div
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {notificationToast.sender}
        </div>
        <div
          style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {notificationToast.text}
        </div>
      </div>
      <button
        onClick={() => setNotificationToast(null)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '4px',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

const MainLayout = () => {
  const { user } = useAuth();

  return (
    <>
      {!user && <LoginModal />}
      <ToastBanner />
      <div className="app-container">
        <Sidebar />
        <ChatArea />
      </div>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <MainLayout />
      </SocketProvider>
    </AuthProvider>
  );
}
