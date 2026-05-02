import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Phone, Banknote, Bed, Bath, FileText, ChevronRight, Upload, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

import { Property } from '@/types';

interface ListPropertyProps {
  onSuccess: () => void;
  initialData?: Property;
}

export const ListProperty: React.FC<ListPropertyProps> = ({ onSuccess, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    rent: initialData?.rent?.toString() || '',
    area: initialData?.area || '',
    subArea: initialData?.subArea || '',
    beds: initialData?.beds?.toString() || '',
    bathroom: initialData?.bathroom?.toString() || '',
    balcony: initialData?.balcony?.toString() || '',
    lift: initialData?.lift || '',
    parking: initialData?.parking || '',
    gas: initialData?.gas || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    division: initialData?.division || 'Dhaka',
    district: initialData?.district || 'Dhaka'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData(prev => ({ ...prev, [name]: value || '' }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      // Allow any size for demo purposes or increase to 10MB if needed.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => {
          // Prevent duplicates if needed, but for now just append
          return [...prev, reader.result as string];
        });
      };
      reader.readAsDataURL(file);
    });
    
    // Clear the input value so the same file(s) can be selected again if removed
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = initialData ? `/api/properties/${initialData._id}` : '/api/properties';
      const method = initialData ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"]
        })
      });

      if (res.ok) {
        toast.success(initialData ? "Property updated successfully!" : "Property listed successfully!");
        onSuccess();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to list property");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const [locationData, setLocationData] = useState<{
    divisions: string[];
    districts: Record<string, string[]>;
    areas: Record<string, string[]>;
    subAreas: Record<string, string[]>;
  }>({ divisions: [], districts: {}, areas: {}, subAreas: {} });

  useEffect(() => {
    fetch('/data/locations.json')
      .then(res => res.json())
      .then(data => setLocationData(data))
      .catch(err => console.error('Failed to load locations:', err));
  }, []);

  const divisions = locationData.divisions;
  const districts = formData.division ? (locationData.districts[formData.division] || []) : [];
  const areas = formData.district ? (locationData.areas[formData.district] || []) : [];
  const subAreas = formData.area ? (locationData.subAreas[formData.area] || []) : [];

  return (
    <div className="bg-white max-w-4xl mx-auto my-4 shadow-xl border px-6 sm:px-8 py-2 sm:py-8">
      <header className="mb-8 sm:mb-10 text-center sm:text-left">
        <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-1 sm:mb-2 font-sans">Owner Portal</h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase font-sans">
          {initialData ? 'Edit Your Property' : 'List Your Property'}
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-2 font-sans px-2 sm:px-0">
          {initialData ? 'Update the details below.' : 'Fill in the details below to showcase your home to potential renters.'}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Box */}
        <Card className="border-2 border-dashed border-slate-200 rounded-3xl overflow-hidden shadow-none bg-slate-50/50 hover:border-brand-300 transition-colors">
          <CardContent className="p-0">
            {images.length > 0 ? (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-video w-full group rounded-xl overflow-hidden border border-slate-200">
                      <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button type="button" variant="destructive" onClick={() => removeImage(index)} className="rounded-full w-10 h-10 p-0">
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <label className="relative aspect-video w-full rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-brand-300 hover:bg-slate-50 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs font-medium text-slate-500">Add More</span>
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center py-20 cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:text-brand-600 group-hover:scale-110 transition-all mb-4 border border-slate-100">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900 font-sans uppercase tracking-tight">Upload Property Images</p>
                  <p className="text-xs text-slate-400 font-medium font-sans mt-1">JPEG, PNG</p>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
              </label>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Property Title</Label>
              <Input
                name="title"
                placeholder="e.g. Luxury 3BHK in Gulshan"
                required
                value={formData.title}
                onChange={handleChange}
                className="h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus-visible:ring-brand-600/5 focus-visible:border-brand-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1">Division</Label>
                <Select value={formData.division} onValueChange={(v: string | null) => {
                  setFormData(prev => ({ ...prev, division: v || '', district: '', area: '', subArea: '' }));
                }}>
                  <SelectTrigger className="w-full !h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus:ring-brand-600/5 focus:border-brand-600">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5 text-left">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1">District</Label>
                <Select value={formData.district} onValueChange={(v: string | null) => {
                  setFormData(prev => ({ ...prev, district: v || '', area: '', subArea: '' }));
                }} disabled={!formData.division || districts.length === 0}>
                  <SelectTrigger className="w-full !h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus:ring-brand-600/5 focus:border-brand-600">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Area</Label>
                <Select value={formData.area} onValueChange={(v: string | null) => {
                  setFormData(prev => ({ ...prev, area: v || '', subArea: '' }));
                }} disabled={!formData.district || areas.length === 0}>
                  <SelectTrigger className="w-full !h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus:ring-brand-600/5 focus:border-brand-600">
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Sub-Area</Label>
                <Select value={formData.subArea} onValueChange={(v: string | null) => handleSelectChange('subArea', v)} disabled={!formData.area || subAreas.length === 0}>
                  <SelectTrigger className="w-full !h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus:ring-brand-600/5 focus:border-brand-600">
                    <SelectValue placeholder="Select Sub-Area" />
                  </SelectTrigger>
                  <SelectContent>
                    {subAreas.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Exact Address (Private)</Label>
              <Input
                name="address"
                placeholder="House, Road, Block..."
                required
                value={formData.address}
                onChange={handleChange}
                className="h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus-visible:ring-brand-600/5 focus-visible:border-brand-600"
              />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest ml-1">* This will be hidden until unlocked</p>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Contact Number (Private)</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                <Input
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 pl-12 pr-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus-visible:ring-brand-600/5 focus-visible:border-brand-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Monthly Rent (৳)</Label>
              <Input
                name="rent"
                type="number"
                placeholder="e.g. 25000"
                required
                value={formData.rent}
                onChange={handleChange}
                className="h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus-visible:ring-brand-600/5 focus-visible:border-brand-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Beds</Label>
                <Input name="beds" type="number" placeholder="e.g. 3" required value={formData.beds} onChange={handleChange} className="h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Baths</Label>
                <Input name="bathroom" type="number" placeholder="e.g. 2" required value={formData.bathroom} onChange={handleChange} className="h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Balcony</Label>
                <Input name="balcony" type="number" placeholder="e.g. 2" required value={formData.balcony} onChange={handleChange} className="h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Lift</Label>
                <Select value={formData.lift} onValueChange={(v: string | null) => handleSelectChange('lift', v)}>
                  <SelectTrigger className="w-full !h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus:ring-brand-600/5 focus:border-brand-600">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Parking</Label>
                <Select value={formData.parking} onValueChange={(v: string | null) => handleSelectChange('parking', v)}>
                  <SelectTrigger className="w-full !h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus:ring-brand-600/5 focus:border-brand-600">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Gas</Label>
                <Select value={formData.gas} onValueChange={(v: string | null) => handleSelectChange('gas', v)}>
                  <SelectTrigger className="w-full !h-12 px-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus:ring-brand-600/5 focus:border-brand-600">
                    <SelectValue placeholder="Select Gas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prepaid">Prepaid</SelectItem>
                    <SelectItem value="postpaid">Postpaid</SelectItem>
                    <SelectItem value="cylinder">Cylinder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs uppercase font-bold text-slate-400 tracking-widest ml-1 font-sans">Detailed Description</Label>
          <Textarea
            name="description"
            placeholder="Describe your property, nearby landmarks, facilities, rules, and anything else renters should know..."
            value={formData.description}
            onChange={handleChange}
            className="w-full min-h-[160px] p-4 rounded-2xl border-2 border-slate-200 bg-white font-sans ring-offset-0 focus-visible:ring-brand-600/5 focus-visible:border-brand-600 resize-none"
          />
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center">
          <Button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto h-14 px-12 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all active:scale-95 border-none"
          >
            {loading ? 'Processing...' : (
              <div className="flex items-center gap-3">
                List Property Now
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </Button>
          <p className="text-xs text-slate-400 font-medium font-sans">
            By clicking list, you agree to our terms of property verification.
          </p>
        </div>
      </form>
    </div>
  );
};
