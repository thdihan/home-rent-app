"use client";

import React from 'react';
import { Bed, MapPin, Bath } from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/LanguageContext';

interface HouseCardProps {
  property: Property;
  onViewDetails: (id: string) => void | Promise<void>;
}

export const HouseCard: React.FC<HouseCardProps> = ({ property, onViewDetails }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => onViewDetails(property._id)}
      className="h-full"
    >
      <Card className="overflow-hidden border-slate-200 hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 cursor-pointer group flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={property.images?.[0] || (property as any).image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <Badge variant={property.isLocked ? "secondary" : "default"} className="bg-white/95 backdrop-blur text-xs font-bold tracking-wider text-slate-800 shadow-sm border border-slate-100 uppercase hover:bg-white/90">
              {property.isLocked ? t('card_featured') : t('card_unlocked')}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-brand-600 transition-colors uppercase tracking-tight">
              {property.title}
            </h3>
          </div>
          
          <div className="flex items-center text-slate-500 text-sm mb-4 font-medium">
            <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-brand-400" />
            <span className="truncate">{property.area}, {property.district}</span>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 flex items-center justify-between border-t border-slate-100 mt-auto">
          <div className="flex gap-4 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span className="text-xs font-bold">{property.beds}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span className="text-xs font-bold">{property.balcony}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-brand-600 font-bold text-2xl tracking-tight leading-none">৳ {(property.rent / 1000).toFixed(0)}k</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
