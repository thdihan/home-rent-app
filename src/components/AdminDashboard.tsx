import React, { useEffect, useState } from 'react';
import { Property, Payment, UserData } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, ShieldAlert, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ListProperty } from './ListProperty';
import { useTable } from '../hooks/useTable';
import { TablePagination, SortableHeader } from './TableUtils';

interface AdminDashboardData {
  users: UserData[];
  properties: Property[];
  payments: (Payment & { userId: { email: string } })[];
}

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Property Editing
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isListingNew, setIsListingNew] = useState(false);

  const propertyTable = useTable({ data: data?.properties || [], initialSortKey: 'createdAt' });
  const userTable = useTable({ data: data?.users || [], initialSortKey: 'createdAt' });
  const paymentTable = useTable({ data: data?.payments || [], initialSortKey: 'createdAt' });

  // Status Modals
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [newPaymentStatus, setNewPaymentStatus] = useState<string>('pending');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newUserStatus, setNewUserStatus] = useState<string>('active');

  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [newPropertyStatus, setNewPropertyStatus] = useState<string>('active');

  // Credit Modal
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [creditUser, setCreditUser] = useState<UserData | null>(null);
  const [creditAmount, setCreditAmount] = useState<string>('');

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const dashboardData = await res.json();
        setData(dashboardData);
      } else {
        toast.error("Failed to load admin dashboard");
        if (res.status === 403 || res.status === 401) {
          window.location.href = '/dashboard';
        }
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdatePaymentStatus = async () => {
    if (!selectedPayment) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/payments/${selectedPayment._id}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newPaymentStatus })
      });
      if (res.ok) {
        toast.success(`Payment marked as ${newPaymentStatus}`);
        setIsPaymentModalOpen(false);
        fetchAdminData();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update status");
      }
    } catch (e) {
      toast.error("Error updating payment");
    }
  };

  const handleUpdateUserStatus = async () => {
    if (!selectedUser) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${(selectedUser as any)._id || selectedUser.id}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newUserStatus })
      });
      if (res.ok) {
        toast.success(`User marked as ${newUserStatus}`);
        setIsUserModalOpen(false);
        fetchAdminData();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update status");
      }
    } catch (e) {
      toast.error("Error updating user");
    }
  };

  const handleUpdatePropertyStatus = async () => {
    if (!selectedProperty) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/properties/${selectedProperty._id}/status`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newPropertyStatus })
      });
      if (res.ok) {
        toast.success(`Property marked as ${newPropertyStatus}`);
        setIsPropertyModalOpen(false);
        fetchAdminData();
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update status");
      }
    } catch (e) {
      toast.error("Error updating property");
    }
  };

  const handleAddCredits = async () => {
    if (!creditUser) return;
    const amount = Number(creditAmount);
    if (!amount || amount <= 0 || !Number.isInteger(amount)) {
      toast.error('Please enter a valid positive number');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${(creditUser as any)._id || creditUser.id}/credits`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      if (res.ok) {
        const result = await res.json();
        toast.success(result.message);
        setIsCreditModalOpen(false);
        setCreditAmount('');
        fetchAdminData();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to add credits');
      }
    } catch (e) {
      toast.error('Error adding credits');
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-8 py-12"><div className="h-64 bg-slate-100 rounded-3xl animate-pulse" /></div>;
  }

  if (!data) return null;

  if (editingProperty || isListingNew) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
        <Button variant="ghost" onClick={() => { setEditingProperty(null); setIsListingNew(false); }} className="mb-4 text-brand-600">
          &larr; Back to Admin Dashboard
        </Button>
        <ListProperty 
          initialData={editingProperty || undefined} 
          onSuccess={() => {
            setEditingProperty(null);
            setIsListingNew(false);
            fetchAdminData();
          }} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
      <header className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1 sm:mb-2 font-sans">Admin Central</h2>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase font-sans">Full Dashboard</h1>
        </div>
        <Button onClick={() => setIsListingNew(true)} className="bg-brand-600 hover:bg-brand-700 text-white font-bold">
          List New Property
        </Button>
      </header>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList className="grid w-full mb-8 bg-slate-100 p-1.5 rounded-2xl min-h-[64px] grid-cols-3">
          <TabsTrigger value="properties" className="rounded-xl h-full py-3 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-md font-bold text-xs sm:text-sm">All Properties</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl h-full py-3 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-md font-bold text-xs sm:text-sm">All Users</TabsTrigger>
          <TabsTrigger value="payments" className="rounded-xl h-full py-3 data-[state=active]:bg-white data-[state=active]:text-brand-600 data-[state=active]:shadow-md font-bold text-xs sm:text-sm">All Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="mt-0">
          <Card className="bg-white border-slate-100 rounded-3xl shadow-sm p-4 h-full">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-xl font-bold text-slate-900 uppercase">Manage Properties</CardTitle>
              <Input 
                placeholder="Search properties..." 
                value={propertyTable.filterText}
                onChange={(e) => propertyTable.setFilterText(e.target.value)}
                className="max-w-xs h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
              />
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm text-slate-500 font-sans">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                    <tr>
                      <SortableHeader label="Title / Location" sortKey="title" currentSortKey={propertyTable.sortKey as string} currentSortDirection={propertyTable.sortDirection} onSort={propertyTable.handleSort} className="rounded-tl-xl" />
                      <SortableHeader label="Rent" sortKey="rent" currentSortKey={propertyTable.sortKey as string} currentSortDirection={propertyTable.sortDirection} onSort={propertyTable.handleSort} />
                      <SortableHeader label="Status" sortKey="status" currentSortKey={propertyTable.sortKey as string} currentSortDirection={propertyTable.sortDirection} onSort={propertyTable.handleSort} />
                      <SortableHeader label="Date" sortKey="createdAt" currentSortKey={propertyTable.sortKey as string} currentSortDirection={propertyTable.sortDirection} onSort={propertyTable.handleSort} />
                      <th className="px-4 py-4 rounded-tr-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyTable.paginatedData.map((p) => (
                      <tr key={p._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-4 font-bold text-slate-800">{p.title}<div className="text-xs text-slate-400 font-normal">{p.area}, {p.district}</div></td>
                        <td className="px-4 py-4 font-bold text-slate-700">৳ {p.rent.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <Badge variant="outline" className="bg-slate-100">{p.status?.toUpperCase() || 'ACTIVE'}</Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-500">
                          {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-4 py-4 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingProperty(p)}><Edit2 className="w-3 h-3 mr-1" /> Edit</Button>
                          <Button size="sm" variant="outline" onClick={() => { setSelectedProperty(p); setNewPropertyStatus(p.status || 'active'); setIsPropertyModalOpen(true); }}><ShieldAlert className="w-3 h-3 mr-1" /> Status</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TablePagination currentPage={propertyTable.currentPage} totalPages={propertyTable.totalPages} setCurrentPage={propertyTable.setCurrentPage} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-0">
          <Card className="bg-white border-slate-100 rounded-3xl shadow-sm p-4 h-full">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-xl font-bold text-slate-900 uppercase">Manage Users</CardTitle>
              <Input 
                placeholder="Search users..." 
                value={userTable.filterText}
                onChange={(e) => userTable.setFilterText(e.target.value)}
                className="max-w-xs h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
              />
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm text-slate-500 font-sans">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                    <tr>
                      <SortableHeader label="Email" sortKey="email" currentSortKey={userTable.sortKey as string} currentSortDirection={userTable.sortDirection} onSort={userTable.handleSort} className="rounded-tl-xl" />
                      <SortableHeader label="Role" sortKey="role" currentSortKey={userTable.sortKey as string} currentSortDirection={userTable.sortDirection} onSort={userTable.handleSort} />
                      <SortableHeader label="Credits" sortKey="credits" currentSortKey={userTable.sortKey as string} currentSortDirection={userTable.sortDirection} onSort={userTable.handleSort} />
                      <SortableHeader label="Status" sortKey="status" currentSortKey={userTable.sortKey as string} currentSortDirection={userTable.sortDirection} onSort={userTable.handleSort} />
                      <SortableHeader label="Date" sortKey="createdAt" currentSortKey={userTable.sortKey as string} currentSortDirection={userTable.sortDirection} onSort={userTable.handleSort} />
                      <th className="px-4 py-4 rounded-tr-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTable.paginatedData.map((u: any) => (
                      <tr key={u._id || u.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-4 font-bold text-slate-800">{u.email}</td>
                        <td className="px-4 py-4"><Badge variant="outline" className="text-brand-600 bg-brand-50">{u.role}</Badge></td>
                        <td className="px-4 py-4 font-bold text-slate-700">{u.credits}</td>
                        <td className="px-4 py-4"><Badge variant={u.status === 'locked' || u.status === 'banned' ? 'destructive' : 'outline'}>{u.status?.toUpperCase() || 'ACTIVE'}</Badge></td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-500">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-4 py-4 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => { setSelectedUser(u); setNewUserStatus(u.status || 'active'); setIsUserModalOpen(true); }}>Manage</Button>
                          <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => { setCreditUser(u); setCreditAmount(''); setIsCreditModalOpen(true); }}><Coins className="w-3 h-3 mr-1" /> Credits</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TablePagination currentPage={userTable.currentPage} totalPages={userTable.totalPages} setCurrentPage={userTable.setCurrentPage} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-0">
          <Card className="bg-white border-slate-100 rounded-3xl shadow-sm p-4 h-full">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle className="text-xl font-bold text-slate-900 uppercase">Manage Payments</CardTitle>
              <Input 
                placeholder="Search payments..." 
                value={paymentTable.filterText}
                onChange={(e) => paymentTable.setFilterText(e.target.value)}
                className="max-w-xs h-9 text-xs rounded-xl bg-slate-50 border-slate-200"
              />
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm text-slate-500 font-sans">
                  <thead className="text-xs text-slate-400 uppercase bg-slate-50">
                    <tr>
                      <SortableHeader label="User" sortKey="userId.email" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} className="rounded-tl-xl" />
                      <SortableHeader label="Date" sortKey="createdAt" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} />
                      <SortableHeader label="TxID / Sender" sortKey="txid" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} />
                      <SortableHeader label="Amount / Credits" sortKey="amount" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} />
                      <SortableHeader label="Status" sortKey="status" currentSortKey={paymentTable.sortKey as string} currentSortDirection={paymentTable.sortDirection} onSort={paymentTable.handleSort} />
                      <th className="px-4 py-4 rounded-tr-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentTable.paginatedData.map((payment: any) => (
                      <tr key={payment._id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-4 py-4"><div className="font-bold text-slate-800">{payment.userId?.email || 'Unknown'}</div></td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-500 font-medium">{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-4 py-4"><div className="font-bold uppercase text-slate-700">{payment.txid}</div><div className="text-xs text-slate-500">bKash: {payment.senderNumber}</div></td>
                        <td className="px-4 py-4"><div className="font-bold text-slate-900">৳ {payment.amount}</div><div className="text-xs text-brand-600 font-bold">+{payment.credits}</div></td>
                        <td className="px-4 py-4"><Badge className={payment.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : payment.status === 'rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}>{payment.status?.toUpperCase() || 'PENDING'}</Badge></td>
                        <td className="px-4 py-4">
                          <Button size="sm" variant="outline" onClick={() => { setSelectedPayment(payment); setNewPaymentStatus(payment.status || 'pending'); setIsPaymentModalOpen(true); }}>Manage</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <TablePagination currentPage={paymentTable.currentPage} totalPages={paymentTable.totalPages} setCurrentPage={paymentTable.setCurrentPage} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Update Payment Status</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
              <Select value={newPaymentStatus} onValueChange={(v: string | null) => v && setNewPaymentStatus(v)}>
                <SelectTrigger className="w-full border-2 border-slate-200"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button onClick={handleUpdatePaymentStatus} className="bg-brand-600 hover:bg-brand-700 text-white font-bold">Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Update User Status</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
              <Select value={newUserStatus} onValueChange={(v: string | null) => v && setNewUserStatus(v)}>
                <SelectTrigger className="w-full border-2 border-slate-200"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="locked">Locked</SelectItem><SelectItem value="banned">Banned</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button onClick={handleUpdateUserStatus} className="bg-brand-600 hover:bg-brand-700 text-white font-bold">Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Property Modal */}
      <Dialog open={isPropertyModalOpen} onOpenChange={setIsPropertyModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Update Property Status</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
              <Select value={newPropertyStatus} onValueChange={(v: string | null) => v && setNewPropertyStatus(v)}>
                <SelectTrigger className="w-full border-2 border-slate-200"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="hidden">Hidden</SelectItem><SelectItem value="banned">Banned</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button onClick={handleUpdatePropertyStatus} className="bg-brand-600 hover:bg-brand-700 text-white font-bold">Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credit Modal */}
      <Dialog open={isCreditModalOpen} onOpenChange={setIsCreditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Credits to User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">User</p>
              <p className="text-sm font-bold text-slate-900">{(creditUser as any)?.email}</p>
              <p className="text-xs text-slate-500 mt-1">Current balance: <span className="font-bold text-brand-600">{creditUser?.credits || 0} credits</span></p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Credits to Add</label>
              <Input
                type="number"
                min="1"
                placeholder="e.g. 10"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                className="h-12 rounded-xl border-2 border-slate-200 text-lg font-bold text-center"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCredits} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
              <Coins className="w-4 h-4 mr-2" /> Add Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
