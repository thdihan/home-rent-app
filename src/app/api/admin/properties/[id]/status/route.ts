import { NextRequest, NextResponse } from 'next/server';
import { Property } from '@/models/Property';
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
    if (!['active', 'hidden', 'banned'].includes(status)) {
      return NextResponse.json({ error: "Invalid status provided" }, { status: 400 });
    }

    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    property.status = status;
    await property.save();

    return NextResponse.json({ message: `Property status updated to ${status}`, property });
  } catch (err) {
    console.error("Failed to update property status", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
