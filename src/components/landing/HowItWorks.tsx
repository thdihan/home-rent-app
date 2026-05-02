"use client";

import React from 'react';
import { Zap, Key, UserCheck, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('hiw_step1_title'),
      desc: t('hiw_step1_desc'),
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Zap,
      title: t('hiw_step2_title'),
      desc: t('hiw_step2_desc'),
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: Key,
      title: t('hiw_step3_title'),
      desc: t('hiw_step3_desc'),
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: UserCheck,
      title: t('hiw_step4_title'),
      desc: t('hiw_step4_desc'),
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-8">
      <div className="text-center mb-16">
        <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-4 font-sans">{t('hiw_badge')}</h2>
        <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight uppercase font-sans">{t('hiw_title')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full p-6 bg-white border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group rounded-3xl border-none">
              <CardHeader className="p-0 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${step.color}`}>
                  <step.icon className="w-7 h-7" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="text-lg font-bold text-slate-900 mb-3 tracking-tight uppercase font-sans">{step.title}</CardTitle>
                <p className="text-slate-500 text-sm font-medium leading-relaxed font-sans">{step.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
