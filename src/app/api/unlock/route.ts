import { NextRequest, NextResponse } from 'next/server';
import { Unlock } from '@/models/Unlock';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }

    const { propertyId } = await req.json();

    if (user.credits < 1) {
      return NextResponse.json({ error: "Insufficient credits", redirectToPricing: true }, { status: 402 });
    }

    const existingUnlock = await Unlock.findOne({ userId: user._id, propertyId });
    if (existingUnlock) {
      return NextResponse.json({ message: "Already unlocked" });
    }

    user.credits -= 1;
    await user.save();

    await Unlock.create({ userId: user._id, propertyId });

    return NextResponse.json({ message: "Property unlocked successfully", creditsRemaining: user.credits });
  } catch (err) {
    return NextResponse.json({ error: "Unlock failed" }, { status: 500 });
  }
}
