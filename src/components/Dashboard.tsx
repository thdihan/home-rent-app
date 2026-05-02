import React, { useEffect, useState } from 'react';
import { Property, Payment } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, CreditCard, Home, Calendar, ChevronRight, Lock, Edit2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ListProperty } from './ListProperty';
import { useTable } from '../hooks/useTable';
import { TablePagination, SortableHeader } from './TableUtils';

interface DashboardData {
  user: {
    email: string;
    credits: number;
    role: string;
  };
  unlockedProperties: Property[];
  listedProperties: Property[];
  paymentHistory: Payment[];
}

interface DashboardProps {
  onPropertyClick: (property: Property) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onPropertyClick }) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const paymentTable = useTable({ data: data?.paymentHistory || [], initialSortKey: 'createdAt' });
  const unlockedTable = useTable({ data: data?.unlockedProperties || [], initialSortKey: 'createdAt' });
  const listedTable = useTable({ data: data?.listedProperties || [], initialSortKey: 'createdAt' });

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Development bypass logic
      if (token === 'dev-bypass-token') {
        setData({
          user: {
            email: 'developer@stayease.io',
            credits: 999,
            role: 'User'
          },
          unlockedProperties: [
            {
              _id: 'mock-1',
              title: 'Emerald Luxury Suite (Demo)',
              division: 'Dhaka',
              area: 'Gulshan 2',
              district: 'Dhaka',
              address: 'Road 71, Block B, House 12',
              rent: 85000,
              beds: 3,
              bathroom: 2,
              balcony: 2,
              phone: '01711-223344',
              images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
              isLocked: false
            },
            {
              _id: 'mock-2',
              title: 'Skyline Penthouse (Demo)',
              division: 'Dhaka',
              area: 'Banani',
              district: 'Dhaka',
              address: 'Road 11, Tower 5, Level 18',
              rent: 120000,
              beds: 4,
              bathroom: 3,
              balcony: 3,
              phone: '01822-334455',
              images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'],
              isLocked: false
            }
          ],
          listedProperties: [],
          paymentHistory: [
            {
              _id: 'mock-pay-1',
              amount: 500,
              credits: 50,
              plan: 'Premium Plan',
              status: 'pending',
              createdAt: new Date().toISOString()
            }
          ]
        });
        setLoading(false);
        return;
      }

      const res = await fetch('/api/user/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const dashboardData = await res.json();
        if (dashboardData.user?.role === 'Admin') {
          window.location.href = '/admin';
          return;
        }
        setData(dashboardData);
      } else {
        toast.error("Failed to load dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      <header className="mb-8 sm:mb-12">
        <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-1 sm:mb-2 font-sans text-center sm:text-left">User Central</h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase font-sans text-center sm:text-left">Profile Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Status Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-slate-900 text-white border-none rounded-3xl shadow-2xl p-4">
            <CardHeader>
              <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                <CreditCard className="w-8 h-8" />
              </div>
              <CardTitle className="text-2xl font-bold font-sans">Wallet Balance</CardTitle>
              <CardDescription className="text-slate-400 font-sans">Your available hunt credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">{data.user.credits}</span>
                <span className="text-brand-500 font-bold uppercase tracking-widest text-xs sm:text-sm">Credits</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-100 rounded-3xl shadow-sm p-4">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 uppercase tracking-tight font-sans">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                <p className="font-bold text-slate-800 break-all">{data.user.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Membership</p>
                <Badge className="bg-brand-50 text-brand-600 border-none px-3 py-1 font-bold uppercase tracking-tighter">
                  {data.user.role} Member
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area with Tabs */}
        <div className="lg:col-span-2">
          {editingProperty ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-8">
              <Button variant="ghost" onClick={() => setEditingProperty(null)} className="mb-4 text-brand-600">
                &larr; Back to Dashboard
              </Button>
              <ListProperty 
                initialData={editingProperty} 
                onSuccess={() => {
                  setEditingProperty(null);
                  fetchDashboard();
                }} 
              />
            </div>
          ) : (
            <Tabs defaultValue="unlocked" className="w-full">
              <TabsList className={`grid w-full mb-8 bg-slate-100 p-1.5 rounded-2xl min-h-[64px] grid-cols-3`}>
                <TabsTrigger value="unlocked" className="rounded-xl h-full py-3 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-md font-bold text-xs sm:text-sm whitespace-normal text-center">Unlocked Property</TabsTrigger>
                <TabsTrigger value="listed" className="rounded-xl h-full py-3 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-md font-bold text-xs sm:text-sm whitespace-normal text-center">My Listed Property</TabsTrigger>
                <TabsTrigger value="payments" className="rounded-xl h-full py-3 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-md font-bold text-xs sm:text-sm whitespace-normal text-center">Payment History</TabsTrigger>
              </TabsList>

              <TabsContent value="unlocked" className="mt-0">
                <Card className="bg-white border-slate-100 rounded-3xl shadow-sm p-4 h-full">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight font-sans">Unlocked Inventory</CardTitle>
                      <CardDescription className="text-xs sm:text-sm font-sans">Browse properties you've already accessed</CardDescription>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Input 
                        placeholder="Search properties..." 
                        value={unlockedTable.filterText}
                        onChange={(e) => unlockedTable.setFilterText(e.target.value)}
                        className="w-full sm:max-w-[150px] h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                      />
                      <Select value={unlockedTable.sortKey as string} onValueChange={(val) => unlockedTable.handleSort(val)}>
                        <SelectTrigger className="w-[110px] h-9 text-xs rounded-xl bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Sort by">
                            {unlockedTable.sortKey === 'createdAt' ? 'Date' : unlockedTable.sortKey === 'rent' ? 'Rent' : unlockedTable.sortKey === 'title' ? 'Title' : 'Sort by'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="createdAt">Date</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {!data.unlockedProperties || data.unlockedProperties.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                          <Lock className="w-8 h-8" />
                        </div>
                        <p className="text-slate-400 font-medium font-sans">No properties unlocked yet.</p>
                        <p className="text-slate-300 text-sm font-sans mt-1">Visit the explore page to find your next home.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full">
                        <div className="grid grid-cols-1 gap-4">
                          {unlockedTable.paginatedData.map((property) => (
                            <motion.div 
                              key={property._id}
                              whileHover={{ y: -2 }}
                              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 cursor-pointer group"
                              onClick={() => onPropertyClick(property)}
                            >
                              <div className="w-full sm:w-24 aspect-video sm:aspect-square rounded-2xl overflow-hidden shrink-0 shadow-md">
                                <img 
                                  src={property.images?.[0] || (property as any).image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"} 
                                  alt={property.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0 w-full">
                                <div className="flex items-center justify-between sm:justify-start gap-2 mb-1">
                                  <h4 className="font-bold text-slate-900 truncate uppercase tracking-tight font-sans">{property.title}</h4>
                                  <Badge className="bg-emerald-50 text-emerald-600 border-none text-xs font-black uppercase whitespace-nowrap">Unlocked</Badge>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1 mb-2 font-sans">
                                  <MapPin className="w-3 h-3" />
                                  {property.area}, {property.district}
                                </p>
                                <div className="flex items-center justify-between sm:justify-start gap-4">
                                  <div className="flex items-center gap-1.5 text-brand-600 font-bold text-xs uppercase tracking-wider font-sans">
                                    <CreditCard className="w-3 h-3" />
                                    ৳ {property.rent.toLocaleString()}
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-400 font-medium text-xs uppercase tracking-wider font-sans">
                                    <Phone className="w-3 h-3" />
                                    {property.phone}
                                  </div>
                                </div>
                              </div>
                              <div className="hidden sm:block text-slate-300 group-hover:text-brand-600 transition-colors">
                                <ChevronRight className="w-6 h-6" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <TablePagination currentPage={unlockedTable.currentPage} totalPages={unlockedTable.totalPages} setCurrentPage={unlockedTable.setCurrentPage} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="listed" className="mt-0">
                <Card className="bg-white border-slate-100 rounded-3xl shadow-sm p-4 h-full">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight font-sans">Your Listings</CardTitle>
                      <CardDescription className="text-xs sm:text-sm font-sans">Manage properties you have listed</CardDescription>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Input 
                        placeholder="Search listings..." 
                        value={listedTable.filterText}
                        onChange={(e) => listedTable.setFilterText(e.target.value)}
                        className="w-full sm:max-w-[150px] h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                      />
                      <Select value={listedTable.sortKey as string} onValueChange={(val) => listedTable.handleSort(val)}>
                        <SelectTrigger className="w-[110px] h-9 text-xs rounded-xl bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Sort by">
                            {listedTable.sortKey === 'createdAt' ? 'Date' : listedTable.sortKey === 'rent' ? 'Rent' : listedTable.sortKey === 'title' ? 'Title' : 'Sort by'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="createdAt">Date</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {!data.listedProperties || data.listedProperties.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                          <Home className="w-8 h-8" />
                        </div>
                        <p className="text-slate-400 font-medium font-sans">No properties listed yet.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full">
                        <div className="grid grid-cols-1 gap-4">
                          {listedTable.paginatedData.map((property) => (
                            <motion.div 
                              key={property._id}
                              whileHover={{ y: -2 }}
                              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 cursor-pointer group"
                              onClick={() => onPropertyClick(property)}
                            >
                              <div className="w-full sm:w-24 aspect-video sm:aspect-square rounded-2xl overflow-hidden shrink-0 shadow-md">
                                <img 
                                  src={property.images?.[0] || (property as any).image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"} 
                                  alt={property.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0 w-full">
                                <div className="flex items-center justify-between sm:justify-start gap-2 mb-1">
                                  <h4 className="font-bold text-slate-900 truncate uppercase tracking-tight font-sans">{property.title}</h4>
                                  <Badge className="bg-brand-50 text-brand-600 border-none text-xs font-black uppercase whitespace-nowrap">Owner</Badge>
                                </div>
                                <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1 mb-2 font-sans">
                                  <MapPin className="w-3 h-3" />
                                  {property.area}, {property.district}
                                </p>
                                <div className="flex items-center justify-between sm:justify-start gap-4">
                                  <div className="flex items-center gap-1.5 text-brand-600 font-bold text-xs uppercase tracking-wider font-sans">
                                    <CreditCard className="w-3 h-3" />
                                    ৳ {property.rent.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 sm:mt-0 flex gap-2">
                                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setEditingProperty(property); }} className="rounded-xl font-bold uppercase tracking-widest text-xs">
                                  <Edit2 className="w-3 h-3 mr-1.5" /> Edit
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <TablePagination currentPage={listedTable.currentPage} totalPages={listedTable.totalPages} setCurrentPage={listedTable.setCurrentPage} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="mt-0">
                <Card className="bg-white border-slate-100 rounded-3xl shadow-sm p-4 h-full">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight font-sans">Payment History</CardTitle>
                      <CardDescription className="text-xs sm:text-sm font-sans">Review your past transactions</CardDescription>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Input 
                        placeholder="Search payments..." 
                        value={paymentTable.filterText}
                        onChange={(e) => paymentTable.setFilterText(e.target.value)}
                        className="w-full sm:max-w-xs h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {!data.paymentHistory || data.paymentHistory.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                          <CreditCard className="w-8 h-8" />
                        </div>
                        <p className="text-slate-400 font-medium font-sans">No payment history found.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm text-slate-500 font-sans">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                              <tr>
                                <SortableHeader label="Date" sortKey="createdAt" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} className="rounded-tl-xl" />
                                <SortableHeader label="Plan / TxID" sortKey="plan" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} />
                                <SortableHeader label="Amount" sortKey="amount" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} />
                                <SortableHeader label="Status" sortKey="status" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} />
                                <SortableHeader label="Credits" sortKey="credits" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} className="rounded-tr-xl" />
                              </tr>
                            </thead>
                            <tbody>
                              {paymentTable.paginatedData.map((payment) => (
                                <tr key={payment._id} className="bg-white border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                  <td className="px-4 py-4 whitespace-nowrap font-medium text-slate-900">
                                    {new Date(payment.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="px-4 py-4 font-bold text-slate-700">
                                    {payment.plan}
                                    {payment.txid && <div className="text-xs text-slate-400 font-normal mt-0.5 uppercase tracking-widest">TrxID: {payment.txid}</div>}
                                  </td>
                                  <td className="px-4 py-4 text-slate-600">
                                    ৳ {payment.amount.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-4">
                                    <Badge className={payment.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : payment.status === 'rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}>
                                      {payment.status?.toUpperCase() || 'PENDING'}
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-4">
                                    <Badge className="bg-brand-50 text-brand-600 border-none font-bold">+{payment.credits}</Badge>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <TablePagination currentPage={paymentTable.currentPage} totalPages={paymentTable.totalPages} setCurrentPage={paymentTable.setCurrentPage} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};
