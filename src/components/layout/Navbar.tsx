"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import { Home, PlusCircle, User, Building2, CreditCard, LayoutDashboard, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { AuthModal } from '@/components/AuthModal';

export function Navbar() {
  const { user, logout, isAuthModalOpen, setIsAuthModalOpen, login, openAuthModal } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 h-20 shrink-0 shadow-sm flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 cursor-pointer shrink-0">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Basha<span className="text-brand-600">Lagbe</span></span>
          </Link>

          <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[13px] font-semibold text-slate-500 flex-1 min-w-0 mx-4">
            <Link 
              href="/"
              className={cn("hover:text-brand-600 transition-colors uppercase tracking-wider whitespace-nowrap", pathname === '/' && "text-brand-600")}
            >
              {t('nav_home')}
            </Link>
            <Link 
              href="/explore"
              className={cn("hover:text-brand-600 transition-colors uppercase tracking-wider whitespace-nowrap", pathname.startsWith('/explore') && "text-brand-600")}
            >
              {t('nav_explore')}
            </Link>
            <Link 
              href="/pricing"
              className={cn("hover:text-brand-600 transition-colors uppercase tracking-wider whitespace-nowrap", pathname === '/pricing' && "text-brand-600")}
            >
              {t('nav_premium')}
            </Link>
            {user && (
              <Link 
                href="/dashboard"
                className={cn("hover:text-brand-600 transition-colors uppercase tracking-wider whitespace-nowrap", pathname === '/dashboard' && "text-brand-600")}
              >
                {t('nav_dashboard')}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button 
              onClick={() => user ? router.push('/list-property') : openAuthModal(t('auth_modal_list_prompt'), "/list-property")}
              className="hidden sm:flex bg-brand-600 hover:bg-brand-700 text-white gap-2 border-none rounded-xl h-10 shadow-lg shadow-brand-100"
            >
              <PlusCircle className="w-4 h-4" />
              {t('nav_list_property')}
            </Button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center bg-slate-100 rounded-full p-0.5 border border-slate-200 transition-all hover:border-brand-300 shrink-0"
              title="Toggle Language"
            >
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-bold tracking-wide transition-all",
                lang === 'bn' ? "bg-brand-600 text-white shadow-sm" : "text-slate-500"
              )}>
                বাং
              </span>
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-bold tracking-wide transition-all",
                lang === 'en' ? "bg-brand-600 text-white shadow-sm" : "text-slate-500"
              )}>
                En
              </span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            {user ? (
              <Link 
                href="/pricing"
                className="bg-brand-50 border border-brand-100 px-3 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 sm:gap-2.5 cursor-pointer hover:bg-brand-100 transition-all active:scale-95 shadow-sm"
              >
                <span className="font-bold text-brand-900 text-sm sm:text-base">{user.credits || 0}</span>
                <div className="bg-brand-600 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-bold">৳</div>
              </Link>
            ) : (
              <Button 
                variant="ghost"
                onClick={() => openAuthModal()}
                className="text-xs font-bold uppercase tracking-wider text-brand-600 px-3 sm:px-5 hover:bg-brand-50 rounded-xl"
              >
                {t('nav_login')}
              </Button>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="w-10 h-10 bg-slate-100 rounded-xl border border-slate-200 hover:border-brand-400" />}>
                  <User className="w-5 h-5 text-slate-500" />
                </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-4 py-3">
                    <p className="text-xs uppercase font-black text-slate-300 tracking-widest mb-1">{t('nav_account')}</p>
                    <p className="text-xs font-bold text-slate-900 truncate">{user?.email || t('nav_guest')}</p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                
                {/* Mobile Menu Items */}
                <div className="lg:hidden">
                  <DropdownMenuItem render={<Link href="/" />} className="flex lg:hidden items-center gap-2 px-4 py-3 rounded-xl cursor-pointer font-bold text-xs">
                    <Home className="w-4 h-4" /> {t('nav_home')}
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/explore" />} className="flex lg:hidden items-center gap-2 px-4 py-3 rounded-xl cursor-pointer font-bold text-xs">
                    <Building2 className="w-4 h-4" /> {t('nav_explore')}
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/pricing" />} className="flex lg:hidden items-center gap-2 px-4 py-3 rounded-xl cursor-pointer font-bold text-xs">
                    <CreditCard className="w-4 h-4" /> {t('nav_premium')}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => user ? router.push('/list-property') : setIsAuthModalOpen(true)} 
                    className="flex sm:hidden items-center gap-2 px-4 py-3 rounded-xl cursor-pointer font-bold text-xs"
                  >
                    <PlusCircle className="w-4 h-4" /> {t('nav_list_property')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="lg:hidden" />
                </div>

                {user ? (
                  <>
                    <DropdownMenuItem render={<Link href="/dashboard" />} className="flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer font-bold text-xs">
                      <LayoutDashboard className="w-4 h-4" />
                      {t('nav_dashboard')}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 text-red-500 focus:text-red-500 focus:bg-red-50 rounded-xl cursor-pointer font-bold text-xs"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav_logout')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer font-bold text-xs"
                  >
                    <User className="w-4 h-4" />
                    {t('nav_sign_in')}
                  </DropdownMenuItem>
                )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(data) => login(data.token, data.user)}
      />
    </>
  );
}
