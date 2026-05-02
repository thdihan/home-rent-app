import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const { amount } = body;
    const creditAmount = Number(amount);

    if (!creditAmount || creditAmount <= 0 || !Number.isInteger(creditAmount)) {
      return NextResponse.json({ error: "Amount must be a positive integer" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.credits = (user.credits || 0) + creditAmount;
    await user.save();

    return NextResponse.json({ 
      message: `${creditAmount} credits added to ${user.email}`,
      credits: user.credits
    });
  } catch (err) {
    console.error("Failed to add credits", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
