"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Property } from '@/types';
import { toast } from 'sonner';
import { ImageIcon, Info, MapPin, Phone, Lock, ChevronLeft, Bed, Bath, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { user, setIsAuthModalOpen, refreshUser } = useAuth();
  const { t } = useLanguage();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/properties/${unwrappedParams.id}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error("Property not found");
      const data = await res.json();
      setProperty(data);
    } catch (err) {
      console.error(err);
      toast.error(t('toast_load_fail'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [unwrappedParams.id]);

  const handleUnlock = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId: unwrappedParams.id })
      });
      
      const data = await res.json();
      if (res.status === 402) {
        toast.error(t('toast_insufficient_credits'));
        router.push('/pricing');
        return;
      }

      await refreshUser();
      await fetchProperty();
      toast.success(t('toast_unlock_success'));
    } catch (err) {
      console.error("Unlock failed", err);
      toast.error(t('toast_unlock_fail'));
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="animate-pulse bg-slate-100 rounded-xl h-16 w-full mb-6" />
        <div className="animate-pulse bg-slate-100 rounded-xl h-96 w-full mb-6" />
        <div className="animate-pulse bg-slate-100 rounded-xl h-64 w-full" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-5xl mx-auto py-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('detail_not_found')}</h1>
        <p className="text-slate-500 mb-8">{t('detail_not_found_desc')}</p>
        <Button onClick={() => router.push('/explore')} variant="outline">
          {t('detail_back_explore')}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 bg-[#f8f9fa] min-h-screen">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-slate-600 hover:bg-slate-200">
        <ChevronLeft className="w-4 h-4 mr-2" /> {t('detail_back')}
      </Button>

      {/* Title Card */}
      <Card className="mb-6 rounded-xl border-slate-200 shadow-sm">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-[#0d6efd] font-normal text-lg sm:text-xl">
            {property.title}
          </h1>
          <div className="shrink-0 text-left sm:text-right">
             <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">৳ {property.rent.toLocaleString()}</h2>
             <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mt-1">{t('detail_monthly_rent')}</p>
          </div>
        </CardContent>
      </Card>

      {/* Image Card */}
      <Card className="mb-6 rounded-xl border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 py-3 px-5 bg-white">
          <CardTitle className="text-[15px] font-normal flex items-center gap-2 text-slate-700">
            <ImageIcon className="w-4 h-4" /> {t('detail_image')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 bg-white relative">
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-2 scrollbar-thin scrollbar-thumb-slate-200">
            {property.images && property.images.length > 0 ? (
              property.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`${property.title} - ${idx + 1}`}
                  className="h-[300px] sm:h-[400px] w-[250px] sm:w-[350px] object-cover rounded-xl shrink-0 snap-center border border-slate-100"
                />
              ))
            ) : (
              <img 
                src={(property as any).image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"}
                alt={property.title}
                className="h-[300px] sm:h-[400px] w-[250px] sm:w-[350px] object-cover rounded-xl shrink-0 snap-center border border-slate-100"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information Card */}
      <Card className="mb-6 rounded-xl border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 py-3 px-5 bg-white">
          <CardTitle className="text-[15px] font-normal flex items-center gap-2 text-slate-700">
            <Info className="w-4 h-4" /> {t('detail_basic_info')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 sm:p-8 bg-white">
          <div className="flex flex-col sm:flex-row justify-between border-b border-slate-100 pb-6 mb-6 gap-6 sm:gap-4 text-[#495057] text-[15px]">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-slate-500" /> {t('detail_bedroom')} : {property.beds}
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-slate-500" /> {t('detail_bathroom')} : {property.bathroom}
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-slate-500" /> {t('detail_balcony')} : {property.balcony}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 text-[13px]">
            <div>
              <p className="text-[#8492a6] font-medium uppercase tracking-wider mb-2">{t('detail_property_id')}</p>
              <p className="text-[#3c4858]">{property._id.slice(-6).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-[#8492a6] font-medium uppercase tracking-wider mb-2">{t('detail_availability')}</p>
              <span className="bg-[#198754] text-white px-3 py-1 rounded-full text-xs font-medium">{t('detail_available')}</span>
            </div>
            <div>
              <p className="text-[#8492a6] font-medium uppercase tracking-wider mb-2">{t('detail_area')}</p>
              <p className="text-[#3c4858]">{property.area}, {property.district}</p>
            </div>
            <div>
              <p className="text-[#8492a6] font-medium uppercase tracking-wider mb-2">{t('detail_category')}</p>
              <p className="text-[#3c4858]">{t('detail_category_value')}</p>
            </div>
            <div>
              <p className="text-[#8492a6] font-medium uppercase tracking-wider mb-2">{t('detail_property_type')}</p>
              <p className="text-[#3c4858]">{t('detail_property_type_value')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card className="mb-6 rounded-xl border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 py-3 px-5 bg-white">
          <CardTitle className="text-[15px] font-normal flex items-center gap-2 text-slate-700">
            <Info className="w-4 h-4" /> {t('detail_description')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 sm:p-8 bg-white">
          <p className="text-[#495057] text-[15px] whitespace-pre-wrap">{property.description || t('detail_no_description')}</p>
        </CardContent>
      </Card>

      {/* Contact Card */}
      <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-100 py-3 px-5 bg-white">
          <CardTitle className="text-[15px] font-normal flex items-center gap-2 text-slate-700">
            <Lock className="w-4 h-4" /> {t('detail_contact')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 sm:p-8 bg-white">

          <div className="bg-[#f8f9fa] border border-slate-200 rounded-xl p-6 sm:p-8">
            {property.isLocked ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-[#e9ecef] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#6c757d]" />
                </div>
                <h3 className="text-lg font-medium text-[#212529] mb-2">{t('detail_locked_title')}</h3>
                <p className="text-[#6c757d] mb-6">{t('detail_locked_desc')}</p>
                <div className="flex flex-col items-center gap-2">
                  <Button onClick={handleUnlock} className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white px-8 py-6 rounded-lg text-[15px]">
                    {t('detail_unlock_btn')}
                  </Button>
                  <p className="text-[#adb5bd] text-xs mt-2">{t('detail_credit_balance')} {user?.credits || 0}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[#8492a6] font-medium uppercase tracking-wider mb-2 text-[13px]">{t('detail_exact_address')}</p>
                  <p className="text-[#212529] text-lg">{property.address}</p>
                </div>
                <div>
                  <p className="text-[#8492a6] font-medium uppercase tracking-wider mb-2 text-[13px]">{t('detail_owner_phone')}</p>
                  <p className="text-[#198754] text-2xl font-bold mb-4">{property.phone}</p>
                  <a href={`tel:${property.phone}`}>
                    <Button className="bg-[#198754] hover:bg-[#157347] text-white rounded-lg">
                      {t('detail_call_owner')}
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
