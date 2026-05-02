"use client";

import { useState } from 'react';
import { Pricing } from '@/components/Pricing';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { toast } from 'sonner';

export default function PricingPage() {
  const { user, setIsAuthModalOpen } = useAuth();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSelectPlan = async (plan: 'A' | 'B' | 'C') => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    router.push(`/payment/checkout?plan=${plan}`);
  };

  return (
    <div className="py-8">
      <Pricing onSelectPlan={handleSelectPlan} isLoading={loading} />
    </div>
  );
}
