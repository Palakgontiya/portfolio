import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('pulsechat_user') || localStorage.getItem('pulsechat_user');
    return saved ? JSON.parse(saved) : null;
  });

  const loginUser = async (username, avatar) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, avatar }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        sessionStorage.setItem('pulsechat_user', JSON.stringify(data.user));
        return data.user;
      }
    } catch (err) {
      console.error('Auth login error:', err);
    }
  };

  const logoutUser = () => {
    setUser(null);
    sessionStorage.removeItem('pulsechat_user');
    localStorage.removeItem('pulsechat_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
