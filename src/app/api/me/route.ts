import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function GET(req: NextRequest) {
  await dbConnect();
  const user = await getUserFromRequest(req);
  
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  
  return NextResponse.json({
    id: user._id,
    email: user.email,
    role: user.role,
    credits: user.credits
  });
}
