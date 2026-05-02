"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { HouseCard } from '@/components/HouseCard';
import { ArrowRight, Building2, Users, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Property } from '@/types';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function LandingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({ division: '', district: '', area: '', subArea: '', search: '' });

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setProperties(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.division) params.append('division', filters.division);
    if (filters.district) params.append('district', filters.district);
    if (filters.area) params.append('area', filters.area);
    if (filters.subArea) params.append('subArea', filters.subArea);
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <Hero filters={filters} setFilters={setFilters} onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-1 sm:mb-2 font-sans">{t('home_editors_choice')}</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase font-sans">{t('home_featured')}</h3>
          </div>
          <Link href="/explore" className="group">
            <Button 
              variant="ghost"
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-brand-600 flex items-center gap-2 p-0 sm:p-2"
            >
                {t('home_view_all')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {properties.slice(0, 3).map(property => (
            <HouseCard 
              key={property._id} 
              property={property} 
              onViewDetails={(id) => router.push(`/properties/${id}`)}
            />
          ))}
        </div>
      </div>

      <HowItWorks />

      <section className="bg-slate-900 border-y border-slate-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <div className="text-center sm:px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mx-auto mb-4 sm:mb-6 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
              <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 tracking-tight">1,200+</h4>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{t('home_stat_listings')}</p>
          </div>
          <div className="text-center sm:px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-400 mx-auto mb-4 sm:mb-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
              <Users className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 tracking-tight">15,000+</h4>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{t('home_stat_renters')}</p>
          </div>
          <div className="text-center sm:px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-400 mx-auto mb-4 sm:mb-6 border border-blue-500/20 shadow-lg shadow-blue-500/5">
              <Map className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 tracking-tight">24+</h4>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{t('home_stat_areas')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
