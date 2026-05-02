"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FilterBar } from '@/components/FilterBar';
import { HouseCard } from '@/components/HouseCard';
import { Property } from '@/types';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/lib/LanguageContext';

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    division: searchParams.get('division') || '',
    district: searchParams.get('district') || '',
    area: searchParams.get('area') || '',
    subArea: searchParams.get('subArea') || '',
    search: searchParams.get('search') || ''
  });

  const fetchProperties = async (currentFilters?: any) => {
    try {
      setLoading(true);
      const activeFilters = currentFilters || filters;
      const params = new URLSearchParams();
      if (activeFilters.division) params.append('division', activeFilters.division);
      if (activeFilters.district) params.append('district', activeFilters.district);
      if (activeFilters.area) params.append('area', activeFilters.area);
      if (activeFilters.subArea) params.append('subArea', activeFilters.subArea);
      
      const sortParam = searchParams.get('sort');
      if (sortParam) params.append('sort', sortParam);

      const res = await fetch(`/api/properties?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch properties", err);
      toast.error(t('toast_fetch_fail'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filters);
  }, [searchParams]);

  const handleSortChange = (newSort: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort && newSort !== 'default') {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-1 sm:mb-2 font-sans">{t('explore_badge')}</h2>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase leading-none font-sans">{t('explore_title')}</h1>
          <p className="text-slate-500 text-base sm:text-lg font-medium max-w-lg mt-3 sm:mt-4 font-sans">{t('explore_subtitle')}</p>
        </div>
      </div>

      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onApply={() => {
          const params = new URLSearchParams();
          if (filters.division) params.append('division', filters.division);
          if (filters.district) params.append('district', filters.district);
          if (filters.area) params.append('area', filters.area);
          if (filters.subArea) params.append('subArea', filters.subArea);
          
          const sortParam = searchParams.get('sort');
          if (sortParam) params.append('sort', sortParam);

          router.push(`/explore?${params.toString()}`);
        }} 
      />

      <div className="mt-8 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-lg font-bold text-slate-900">
          {!loading && `${properties.length} ${properties.length === 1 ? t('explore_property_found') : t('explore_properties_found')}`}
        </h3>
        <div className="w-full sm:w-56">
          <Select 
            value={searchParams.get('sort') || 'default'}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full bg-white border-slate-200 shadow-sm px-4 h-11 rounded-xl text-sm font-medium focus:ring-brand-600/10 focus:border-brand-600 transition-all">
              <span>
                {searchParams.get('sort') === 'price_asc' 
                  ? t('explore_sort_price_asc') 
                  : searchParams.get('sort') === 'price_desc' 
                    ? t('explore_sort_price_desc') 
                    : t('explore_sort_default')}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default" label={t('explore_sort_default')}>{t('explore_sort_default')}</SelectItem>
              <SelectItem value="price_asc" label={t('explore_sort_price_asc')}>{t('explore_sort_price_asc')}</SelectItem>
              <SelectItem value="price_desc" label={t('explore_sort_price_desc')}>{t('explore_sort_price_desc')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-slate-200 shadow-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {properties.map(property => (
            <HouseCard 
              key={property._id} 
              property={property} 
              onViewDetails={(id) => router.push(`/properties/${id}`)}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
