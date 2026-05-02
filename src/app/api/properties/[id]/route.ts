import { NextRequest, NextResponse } from 'next/server';
import { Property } from '@/models/Property';
import { Unlock } from '@/models/Unlock';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req);
    const { id } = await params;
    
    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let isUnlocked = false;
    if (user) {
       const hasUnlocked = await Unlock.findOne({ userId: user._id, propertyId: property._id });
       if (hasUnlocked) isUnlocked = true;
       if (property.ownerId && property.ownerId.toString() === user._id.toString()) isUnlocked = true;
       if (user.role === 'Admin') isUnlocked = true;
    }

    if (isUnlocked) {
      return NextResponse.json({ ...property.toObject(), isLocked: false });
    } else {
      const publicData = property.toObject();
      delete (publicData as any).address;
      delete (publicData as any).phone;
      return NextResponse.json({ ...publicData, isLocked: true });
    }
  } catch (err) {
    return NextResponse.json({ error: "Error fetching property details" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    if (property.ownerId.toString() !== user._id.toString() && user.role !== 'Admin') {
      return NextResponse.json({ error: "Unauthorized to edit this property" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, rent, area, subArea, beds, bathroom, balcony, lift, parking, gas, images, address, phone, division, district } = body;

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rent: Number(rent),
        division: division || 'Dhaka',
        district: district || 'Dhaka',
        area,
        subArea,
        beds: Number(beds),
        bathroom: Number(bathroom),
        balcony: Number(balcony),
        lift: lift || 'no',
        parking: parking || 'no',
        gas: gas || 'cylinder',
        images: Array.isArray(images) ? images : property.images,
        address,
        phone
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedProperty);
  } catch (err) {
    return NextResponse.json({ error: "Error updating property" }, { status: 500 });
  }
}
