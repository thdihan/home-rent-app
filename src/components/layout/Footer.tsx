"use client";

import Link from 'next/link';
import { Home } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 py-12 sm:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg rotate-3 overflow-hidden">
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-sans">Basha<span className="text-brand-600">Lagbe</span></span>
        </Link>
        <p className="text-slate-400 text-xs sm:text-sm font-medium tracking-tight font-sans text-center lg:text-left order-3 lg:order-2">
          {t('footer_copyright')}
        </p>
        <div className="flex gap-6 sm:gap-10 order-2 lg:order-3">
          <a href="#" className="text-slate-500 hover:text-brand-600 text-xs font-bold uppercase tracking-wider transition-colors font-sans">{t('footer_privacy')}</a>
          <a href="#" className="text-slate-500 hover:text-brand-600 text-xs font-bold uppercase tracking-wider transition-colors font-sans">{t('footer_terms')}</a>
          <a href="#" className="text-slate-500 hover:text-brand-600 text-xs font-bold uppercase tracking-wider transition-colors font-sans">{t('footer_contact')}</a>
        </div>
      </div>
    </footer>
  );
}
