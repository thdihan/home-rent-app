import { NextRequest, NextResponse } from 'next/server';
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
    if (!['active', 'locked', 'banned'].includes(status)) {
      return NextResponse.json({ error: "Invalid status provided" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.status = status;
    await user.save();

    return NextResponse.json({ message: `User status updated to ${status}`, user });
  } catch (err) {
    console.error("Failed to update user status", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
