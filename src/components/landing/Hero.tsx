"use client";

import React from 'react';
import { motion } from 'motion/react';
import { FilterBar } from '../FilterBar';
import { useLanguage } from '@/lib/LanguageContext';

interface HeroProps {
  filters: any;
  setFilters: (f: any) => void;
  onSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ filters, setFilters, onSearch }) => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[700px] flex items-center justify-center py-20 px-4 overflow-hidden bg-slate-950">
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" 
          alt="Luxury Home" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-brand-900/20" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/10 backdrop-blur-md rounded-full border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-8 mx-auto">
            {t('hero_badge')}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight uppercase mb-8">
            {t('hero_title_1')} <br />
            <span className="text-brand-400">{t('hero_title_2')}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <div className="max-w-4xl mx-auto">
             <FilterBar 
                filters={filters}
                setFilters={setFilters}
                onApply={onSearch}
             />
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};
