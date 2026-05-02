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
    
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { status } = body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: "Invalid status provided" }, { status: 400 });
    }

    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    const previousStatus = payment.status;
    if (previousStatus === status) {
      return NextResponse.json({ message: "Status unchanged", payment });
    }

    payment.status = status;
    await payment.save();

    const user = await User.findById(payment.userId);
    if (user) {
      if (status === 'approved' && previousStatus !== 'approved') {
        user.credits += payment.credits;
        await user.save();
      } else if (previousStatus === 'approved' && status !== 'approved') {
        // If it was previously approved and now it is pending or rejected, deduct the credits
        user.credits = Math.max(0, user.credits - payment.credits);
        await user.save();
      }
    }

    return NextResponse.json({ message: `Payment marked as ${status}`, payment });
  } catch (err) {
    console.error("Failed to update payment status", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
