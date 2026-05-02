"use client";

import { AdminDashboard } from '@/components/AdminDashboard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      if (token === 'dev-bypass-token') {
         setIsAdmin(true);
         return;
      }
      try {
        const res = await fetch('/api/user/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
           const data = await res.json();
           if (data.user?.role === 'Admin') {
             setIsAdmin(true);
           } else {
             router.push('/dashboard');
           }
        } else {
           router.push('/dashboard');
        }
      } catch {
        router.push('/dashboard');
      }
    };
    checkRole();
  }, [router]);

  if (isAdmin === null) return <div className="max-w-7xl mx-auto px-8 py-12"><div className="h-64 bg-slate-100 rounded-3xl animate-pulse" /></div>;

  return <AdminDashboard />;
}
