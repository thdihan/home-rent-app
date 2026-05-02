import { NextRequest, NextResponse } from 'next/server';
import { Payment } from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

const plans = {
  'A': { name: 'Starter Plan', credits: 10, price: 100 },
  'B': { name: 'Standard Plan', credits: 25, price: 200 },
  'C': { name: 'Pro Plan', credits: 70, price: 500 }
};

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan, txid, senderNumber } = await req.json();

    if (!plan || !txid || !senderNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const planDetails = plans[plan as 'A' | 'B' | 'C'];
    if (!planDetails) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 });
    }

    // Check if TXID already exists to prevent duplicate submissions
    const existingTx = await Payment.findOne({ txid });
    if (existingTx) {
      return NextResponse.json({ error: "Transaction ID already submitted" }, { status: 400 });
    }

    const payment = await Payment.create({
      userId: user._id,
      amount: planDetails.price,
      credits: planDetails.credits,
      plan: planDetails.name,
      status: 'pending',
      txid,
      senderNumber
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (err) {
    console.error("Manual payment error:", err);
    return NextResponse.json({ error: "Failed to submit payment" }, { status: 500 });
  }
}
