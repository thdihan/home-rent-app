import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Payment } from '@/models/Payment';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();
    const creditsToAdd = plan === 'B' ? 50 : 15;
    const amountPaid = plan === 'B' ? 500 : 200;
    
    user.credits += creditsToAdd;
    await user.save();
    
    await Payment.create({
      userId: user._id,
      amount: amountPaid,
      credits: creditsToAdd,
      plan: plan === 'B' ? 'Premium Plan' : 'Basic Plan'
    });
    
    return NextResponse.json({ success: true, credits: user.credits });
  } catch (err) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
