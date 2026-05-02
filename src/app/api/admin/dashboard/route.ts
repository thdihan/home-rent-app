import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';
import { Property } from '@/models/Property';
import { Payment } from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);
    
    if (!authUser || authUser.role !== 'Admin') {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const users = await User.find({}).sort({ _id: -1 }).select('-password');
    const properties = await Property.find({}).sort({ createdAt: -1 });
    const payments = await Payment.find({}).sort({ createdAt: -1 }).populate('userId', 'email');

    return NextResponse.json({
      users,
      properties,
      payments
    });
  } catch (err) {
    console.error("Failed to fetch admin dashboard data", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
