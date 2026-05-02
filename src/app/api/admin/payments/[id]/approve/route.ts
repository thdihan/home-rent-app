import { NextRequest, NextResponse } from 'next/server';
import { Payment } from '@/models/Payment';
import { User } from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const adminUser = await getUserFromRequest(req);
    
    if (!adminUser || adminUser.role !== 'Admin') {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id } = await params;

    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (payment.status === 'approved') {
      return NextResponse.json({ error: "Payment already approved" }, { status: 400 });
    }

    payment.status = 'approved';
    await payment.save();

    const user = await User.findById(payment.userId);
    if (user) {
      user.credits += payment.credits;
      await user.save();
    }

    return NextResponse.json({ message: "Payment approved and credits added" });
  } catch (err) {
    console.error("Failed to approve payment", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
