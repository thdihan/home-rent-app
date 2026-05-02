import { NextRequest, NextResponse } from 'next/server';
import { Unlock } from '@/models/Unlock';
import { User } from '@/models/User';
import { Property } from '@/models/Property';
import { Payment } from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const authUser = await getUserFromRequest(req);
    
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(authUser._id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const unlocks = await Unlock.find({ userId: user._id }).populate("propertyId");
    
    const unlockedProperties = unlocks
      .map(u => u.propertyId)
      .filter(p => p !== null);

    const listedProperties = await Property.find({ ownerId: user._id });
    const paymentHistory = await Payment.find({ userId: user._id }).sort({ createdAt: -1 });

    let adminPendingPayments = [];
    if (user.role === 'Admin') {
      adminPendingPayments = await Payment.find({ status: 'pending' }).sort({ createdAt: -1 }).populate('userId', 'email');
    }

    return NextResponse.json({
      user: {
        email: user.email,
        credits: user.credits,
        role: user.role
      },
      unlockedProperties,
      listedProperties,
      paymentHistory,
      adminPendingPayments
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
