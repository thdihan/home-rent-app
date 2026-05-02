export interface Property {
  _id: string;
  title: string;
  description?: string;
  rent: number;
  division: string;
  district: string;
  area: string;
  subArea?: string;
  beds: number;
  bathroom: number;
  balcony: number;
  lift?: 'yes' | 'no';
  parking?: 'yes' | 'no';
  gas?: 'prepaid' | 'postpaid' | 'cylinder';
  images?: string[];
  isLocked?: boolean;
  address?: string;
  phone?: string;
  status?: 'active' | 'hidden' | 'banned';
  createdAt?: string;
}

export interface UserData {
  id: string;
  email: string;
  role: 'User' | 'Admin';
  credits: number;
  status?: 'active' | 'locked' | 'banned';
  createdAt?: string;
}

export interface Payment {
  _id: string;
  amount: number;
  credits: number;
  plan: string;
  status: 'pending' | 'approved' | 'rejected';
  txid?: string;
  senderNumber?: string;
  createdAt: string;
}
