"use client";

import { Check, CreditCard, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/LanguageContext';

interface PricingProps {
  onSelectPlan: (plan: 'A' | 'B' | 'C') => void;
  isLoading?: boolean;
}

export function Pricing({ onSelectPlan, isLoading }: PricingProps) {
  const { t } = useLanguage();

  return (
    <div className="py-8 sm:py-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase mb-3 px-2">{t('pricing_title')}</h2>
        <p className="text-slate-500 font-medium text-sm sm:text-base px-4">
          {t('pricing_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {/* Plan A - Starter */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex flex-col h-full"
        >
          <Card className="flex flex-col h-full border-slate-200 shadow-sm p-2">
            <CardHeader className="flex flex-row justify-between items-start mb-2">
              <div>
                <CardDescription className="font-bold text-slate-800 uppercase tracking-widest text-xs mb-1">{t('pricing_plan_a_label')}</CardDescription>
                <CardTitle className="text-xl font-bold">{t('pricing_plan_a_name')}</CardTitle>
              </div>
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                <CreditCard className="w-5 h-5" />
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="mb-8">
                <p className="text-4xl font-extrabold text-slate-900 mb-1">৳ 100</p>
                <p className="text-brand-600 font-bold text-sm">{t('pricing_plan_a_credits')}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                   <Check className="w-4 h-4 text-slate-400" />
                   <span>{t('pricing_plan_a_feat1')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                   <Check className="w-4 h-4 text-slate-400" />
                   <span>{t('pricing_plan_a_feat2')}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <Button 
                onClick={() => onSelectPlan('A')}
                disabled={isLoading}
                className="w-full py-6 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 shadow-xl shadow-slate-200 border-none"
              >
                {t('pricing_buy_credits')}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Plan B - Standard (Best Value) */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex flex-col h-full"
        >
          <Card className="flex flex-col h-full border-2 border-brand-200 relative shadow-2xl shadow-brand-100/50 p-2 overflow-visible">
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <Badge className="bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border-none hover:bg-brand-700">
                {t('pricing_best_value')}
              </Badge>
            </div>

            <CardHeader className="flex flex-row justify-between items-start mb-2">
              <div>
                <CardDescription className="font-bold text-brand-600 uppercase tracking-widest text-xs mb-1">{t('pricing_plan_b_label')}</CardDescription>
                <CardTitle className="text-xl font-bold">{t('pricing_plan_b_name')}</CardTitle>
              </div>
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                <Sparkles className="w-5 h-5" />
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="mb-8">
                 <p className="text-4xl font-extrabold text-slate-900 mb-1">৳ 200</p>
                 <p className="text-brand-600 font-bold text-sm">{t('pricing_plan_b_credits')}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                   <Check className="w-4 h-4 text-brand-500" />
                   <span>{t('pricing_plan_b_feat1')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                   <Check className="w-4 h-4 text-brand-500" />
                   <span>{t('pricing_plan_b_feat2')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-600 font-bold">
                   <Check className="w-4 h-4" />
                   <span>{t('pricing_plan_b_feat3')}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <Button 
                onClick={() => onSelectPlan('B')}
                disabled={isLoading}
                className="w-full py-6 bg-brand-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-200 hover:bg-brand-700 transition-all disabled:opacity-50 border-none"
              >
                {t('pricing_get_pro')}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Plan C - Pro */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="flex flex-col h-full"
        >
          <Card className="flex flex-col h-full border-slate-700 shadow-sm p-2 bg-slate-900 text-white overflow-hidden [&>*]:bg-slate-900">
            <CardHeader className="flex flex-row justify-between items-start mb-2 bg-slate-900">
              <div>
                <CardDescription className="font-bold text-brand-400 uppercase tracking-widest text-xs mb-1">{t('pricing_plan_c_label')}</CardDescription>
                <CardTitle className="text-xl font-bold text-white">{t('pricing_plan_c_name')}</CardTitle>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-400">
                <Zap className="w-5 h-5" />
              </div>
            </CardHeader>

            <CardContent className="flex-1 bg-slate-900">
              <div className="mb-8">
                 <p className="text-4xl font-extrabold text-white mb-1">৳ 500</p>
                 <p className="text-brand-400 font-bold text-sm">{t('pricing_plan_c_credits')}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                   <Check className="w-4 h-4 text-brand-400" />
                   <span>{t('pricing_plan_c_feat1')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                   <Check className="w-4 h-4 text-brand-400" />
                   <span>{t('pricing_plan_c_feat2')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-400 font-bold">
                   <Check className="w-4 h-4" />
                   <span>{t('pricing_plan_c_feat3')}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4 bg-slate-900">
              <Button 
                onClick={() => onSelectPlan('C')}
                disabled={isLoading}
                className="w-full py-6 bg-white text-slate-900 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-slate-100 transition-all disabled:opacity-50 border-none"
              >
                {t('pricing_get_ultimate')}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
