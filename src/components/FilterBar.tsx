"use client";

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/LanguageContext';

interface FilterState {
  search: string;
  division: string;
  district: string;
  area: string;
  subArea: string;
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onApply: () => void;
}

interface LocationData {
  divisions: string[];
  districts: Record<string, string[]>;
  areas: Record<string, string[]>;
  subAreas: Record<string, string[]>;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, onApply }) => {
  const { t } = useLanguage();
  const [locationData, setLocationData] = useState<LocationData>({
    divisions: [],
    districts: {},
    areas: {},
    subAreas: {}
  });

  useEffect(() => {
    fetch('/data/locations.json')
      .then(res => res.json())
      .then(data => setLocationData(data))
      .catch(err => console.error('Failed to load locations:', err));
  }, []);

  const handleSelectChange = (name: string, value: string | null) => {
    setFilters({ ...filters, [name]: value || '' });
  };

  const divisions = locationData.divisions;
  const districts = filters.division ? (locationData.districts[filters.division] || []) : [];
  const areas = filters.district ? (locationData.areas[filters.district] || []) : [];
  const subAreas = filters.area ? (locationData.subAreas[filters.area] || []) : [];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        
        {/* Division */}
        <div className="space-y-2 text-left">
          <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider ml-1">{t('filter_division')}</Label>
          <Select 
            value={filters.division}
            onValueChange={(val: string | null) => {
              setFilters({ ...filters, division: val || '', district: '', area: '', subArea: '' });
            }}
          >
            <SelectTrigger className="w-full bg-slate-50 border-2 border-slate-200 px-4 h-12 rounded-xl text-sm font-medium focus:ring-brand-600/10 focus:border-brand-600 transition-all">
              <SelectValue placeholder={t('filter_select_division')} />
            </SelectTrigger>
            <SelectContent>
              {divisions.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div className="space-y-2 text-left">
          <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider ml-1">{t('filter_district')}</Label>
          <Select 
            value={filters.district}
            onValueChange={(val: string | null) => {
              setFilters({ ...filters, district: val || '', area: '', subArea: '' });
            }}
            disabled={!filters.division || districts.length === 0}
          >
            <SelectTrigger className="w-full bg-slate-50 border-2 border-slate-200 px-4 h-12 rounded-xl text-sm font-medium focus:ring-brand-600/10 focus:border-brand-600 transition-all">
              <SelectValue placeholder={t('filter_select_district')} />
            </SelectTrigger>
            <SelectContent>
              {districts.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Area */}
        <div className="space-y-2 text-left">
          <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider ml-1">{t('filter_area')}</Label>
          <Select 
            value={filters.area}
            onValueChange={(val: string | null) => {
              setFilters({ ...filters, area: val || '', subArea: '' });
            }}
            disabled={!filters.district || areas.length === 0}
          >
            <SelectTrigger className="w-full bg-slate-50 border-2 border-slate-200 px-4 h-12 rounded-xl text-sm font-medium focus:ring-brand-600/10 focus:border-brand-600 transition-all">
              <SelectValue placeholder={t('filter_select_area')} />
            </SelectTrigger>
            <SelectContent>
              {areas.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sub Area */}
        <div className="space-y-2 text-left">
          <Label className="text-xs uppercase font-bold text-slate-500 tracking-wider ml-1">{t('filter_sub_area')}</Label>
          <Select 
            value={filters.subArea}
            onValueChange={(val: string | null) => handleSelectChange('subArea', val)}
            disabled={!filters.area || subAreas.length === 0}
          >
            <SelectTrigger className="w-full bg-slate-50 border-2 border-slate-200 px-4 h-12 rounded-xl text-sm font-medium focus:ring-brand-600/10 focus:border-brand-600 transition-all">
              <SelectValue placeholder={t('filter_select_sub_area')} />
            </SelectTrigger>
            <SelectContent>
              {subAreas.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button 
            onClick={onApply}
            className="w-full bg-brand-600 text-white h-12 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-700 shadow-xl shadow-brand-200 transition-all flex items-center justify-center gap-3 active:scale-95 border-none"
          >
             <Search className="w-5 h-5" />
             {t('filter_search_btn')}
          </Button>
        </div>
      </div>
    </div>
  );
};
