"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserData } from '@/types';
import { toast } from 'sonner';
import { getTranslation, Lang } from './translations';

function getLang(): Lang {
  if (typeof window === 'undefined') return 'bn';
  return (localStorage.getItem('lang') as Lang) || 'bn';
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (token: string, user: UserData) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMessage: string | null;
  openAuthModal: (message?: string, redirectUrl?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState<string | null>(null);
  const [authRedirectUrl, setAuthRedirectUrl] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async (token?: string) => {
    const currentToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
    if (!currentToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/me', {
        headers: { 'Authorization': `Bearer ${currentToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (token: string, userData: UserData) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthModalOpen(false);
    setAuthModalMessage(null);
    toast.success(getTranslation(getLang(), 'toast_welcome'));
    if (authRedirectUrl) {
      router.push(authRedirectUrl);
      setAuthRedirectUrl(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.info(getTranslation(getLang(), 'toast_logout'));
  };

  const openAuthModal = (message?: string, redirectUrl?: string) => {
    setAuthModalMessage(message || null);
    setAuthRedirectUrl(redirectUrl || null);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchUser, isAuthModalOpen, setIsAuthModalOpen, authModalMessage, openAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
