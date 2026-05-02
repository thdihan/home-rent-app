"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Copy, CheckCircle2 } from 'lucide-react';

const plans = {
  'A': { name: 'Starter Plan', nameBn: 'স্টার্টার প্ল্যান', credits: 10, price: 100 },
  'B': { name: 'Standard Plan', nameBn: 'স্ট্যান্ডার্ড প্ল্যান', credits: 25, price: 200 },
  'C': { name: 'Pro Plan', nameBn: 'প্রো প্ল্যান', credits: 70, price: 500 }
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  
  const [loading, setLoading] = useState(false);
  const [txid, setTxid] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const planId = searchParams.get('plan') as 'A' | 'B' | 'C';
  const planDetails = plans[planId];

  useEffect(() => {
    if (!planDetails) {
      router.push('/pricing');
    }
  }, [planDetails, router]);

  if (!planDetails) return null;

  const planName = lang === 'bn' ? planDetails.nameBn : planDetails.name;

  const handleCopy = () => {
    navigator.clipboard.writeText('01712345678');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(t('toast_copied'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txid || !senderNumber) {
      toast.error(t('toast_fill_fields'));
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/payment/manual', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          plan: planId,
          txid,
          senderNumber
        })
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      toast.success(t('toast_payment_submitted'));
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error(t('toast_payment_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{t('checkout_title')}</h1>
        <p className="text-slate-500 font-medium mt-2">{t('checkout_subtitle')} {planName}</p>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="bg-brand-600 p-8 text-center text-white">
          <p className="text-brand-100 font-bold uppercase tracking-widest text-sm mb-2">{t('checkout_total')}</p>
          <div className="text-5xl font-black tracking-tighter">
            ৳ {planDetails.price}
          </div>
          <p className="text-brand-200 text-sm mt-2 font-medium">{t('checkout_for_credits')} {planDetails.credits} {t('checkout_credits_label')}</p>
        </div>

        <CardContent className="p-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-brand-100 text-brand-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              {t('checkout_step1')}
            </h3>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm text-slate-600 space-y-3">
              <p>{t('checkout_step1_1')} <strong>{t('checkout_send_money')}</strong></p>
              <p>{t('checkout_step1_2')}</p>
              <div className="flex items-center gap-4 bg-white border border-slate-200 p-3 rounded-xl w-fit">
                <span className="text-xl font-bold text-slate-900 tracking-widest">01712-345678</span>
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0 text-slate-400 hover:text-brand-600">
                  {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
              <p>{t('checkout_step1_3_prefix')} <strong>৳ {planDetails.price}</strong></p>
              <p>{t('checkout_step1_4')} <strong>{t('checkout_trxid')}</strong>.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-brand-100 text-brand-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              {t('checkout_step2')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">{t('checkout_bkash_number')}</Label>
                <Input 
                  placeholder="e.g., 018XXXXXXXX" 
                  value={senderNumber}
                  onChange={e => setSenderNumber(e.target.value)}
                  className="h-12 rounded-xl bg-slate-50 border-slate-200"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">{t('checkout_trxid')}</Label>
                <Input 
                  placeholder="e.g., 8N7A6D5E" 
                  value={txid}
                  onChange={e => setTxid(e.target.value)}
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 uppercase"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-14 text-base bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold uppercase tracking-widest mt-4"
                disabled={loading}
              >
                {loading ? t('checkout_submitting') : t('checkout_submit_btn')}
              </Button>
              <p className="text-xs text-center text-slate-400 font-medium mt-4">
                {t('checkout_note')}
              </p>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
