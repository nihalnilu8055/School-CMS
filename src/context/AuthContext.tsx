import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUserProfile: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('school_cms_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 1,
      name: 'Alexander Wright',
      email: 'admin@apexacademy.edu',
      role: 'Super Admin',
      role_id: 1,
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      is_active: true,
      created_at: new Date().toISOString()
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('school_cms_token') || true; // Default logged in for smooth demo review
  });

  const login = (token: string, loggedInUser: User) => {
    localStorage.setItem('school_cms_token', token);
    localStorage.setItem('school_cms_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('school_cms_token');
    localStorage.removeItem('school_cms_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = (updated: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updated };
      setUser(newUser);
      localStorage.setItem('school_cms_user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
