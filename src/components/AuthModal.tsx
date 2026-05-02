import React, { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { token: string; user: any }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { authModalMessage } = useAuth();
  const { t } = useLanguage();

  const performAuth = async (authEmail: string, authPassword: string) => {
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/api/login' : '/api/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      onSuccess(data);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await performAuth(email, password);
  };

  const handleDemoLogin = async () => {
    const demoEmail = 'user@example.com';
    const demoPassword = 'password123';
    setEmail(demoEmail);
    setPassword(demoPassword);
    await performAuth(demoEmail, demoPassword);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none rounded-3xl">
        <div className="p-8">
          <DialogHeader className="text-center mb-8">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white mx-auto mb-4 font-bold text-xl shadow-lg">S</div>
            <DialogTitle className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase text-center">
              {mode === 'login' ? t('auth_welcome') : t('auth_create')}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-sm font-medium mt-1 text-center">
              {mode === 'login' ? t('auth_login_desc') : t('auth_register_desc')}
            </DialogDescription>
          </DialogHeader>

          {authModalMessage && (
            <div className="mb-6 p-4 bg-brand-50 text-brand-600 rounded-xl text-sm font-bold border border-brand-100 text-center">
              {authModalMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1">{t('auth_email')}</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                <Input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-slate-50 border-slate-100 rounded-2xl text-sm font-medium focus-visible:ring-brand-600/5 focus-visible:border-brand-600 transition-all ring-offset-0"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1">{t('auth_password')}</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                <Input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 h-12 bg-slate-50 border-slate-100 rounded-2xl text-sm font-medium focus-visible:ring-brand-600/5 focus-visible:border-brand-600 transition-all ring-offset-0"
                />
              </div>
            </div>



            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white h-14 rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 group disabled:opacity-50 mt-6 shadow-2xl shadow-slate-200 active:scale-95 border-none"
            >
              {loading ? t('auth_processing') : (
                <>
                  {mode === 'login' ? t('auth_login_btn') : t('auth_join_btn')}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {mode === 'login' && (
              <div className="space-y-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={handleDemoLogin}
                  className="w-full h-12 rounded-2xl text-xs font-bold uppercase tracking-widest border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-brand-600 transition-all border-dashed"
                >
                  {t('auth_demo_login')}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  disabled={loading}
                  onClick={() => {
                    onSuccess({
                      token: 'dev-bypass-token',
                      user: {
                        id: 'dev-user',
                        email: 'developer@stayease.io',
                        credits: 999,
                        role: 'User'
                      }
                    });
                    onClose();
                  }}
                  className="w-full h-10 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-600 hover:bg-brand-50/50 transition-all"
                >
                  {t('auth_dev_bypass')}
                </Button>
              </div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              {mode === 'login' ? t('auth_no_account') : t('auth_already_member')}{' '}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-brand-600 font-bold uppercase tracking-widest text-xs ml-1 hover:underline outline-none"
              >
                {mode === 'login' ? t('auth_register_now') : t('auth_login_here')}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
