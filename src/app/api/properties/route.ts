import { NextRequest, NextResponse } from 'next/server';
import { Property } from '@/models/Property';
import { Unlock } from '@/models/Unlock';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const searchParams = req.nextUrl.searchParams;
    
    const minRent = searchParams.get('minRent');
    const maxRent = searchParams.get('maxRent');
    const beds = searchParams.get('beds');
    const search = searchParams.get('search');
    const division = searchParams.get('division');
    const district = searchParams.get('district');
    const area = searchParams.get('area');
    const subArea = searchParams.get('subArea');
    const sortParam = searchParams.get('sort');

    const query: any = {};

    if (minRent || maxRent) {
      query.rent = {};
      if (minRent) query.rent.$gte = Number(minRent);
      if (maxRent) query.rent.$lte = Number(maxRent);
    }

    if (division) query.division = division;
    if (district) query.district = district;
    if (area) query.area = { $regex: area, $options: 'i' };
    if (subArea) query.subArea = { $regex: subArea, $options: 'i' };

    if (beds) query.beds = Number(beds);
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { area: { $regex: search, $options: 'i' } }
      ];
    }

    let sortQuery: any = { createdAt: -1 };
    if (sortParam === 'price_asc') {
      sortQuery = { rent: 1 };
    } else if (sortParam === 'price_desc') {
      sortQuery = { rent: -1 };
    }

    const user = await getUserFromRequest(req);
    const properties = await Property.find(query).sort(sortQuery).select('-address -phone').lean();

    let unlockedPropertyIds: string[] = [];
    if (user) {
      const unlocks = await Unlock.find({ userId: user._id }).select('propertyId');
      unlockedPropertyIds = unlocks.map(u => u.propertyId.toString());
    }

    const propertiesWithLockState = properties.map(p => {
      let isUnlocked = false;
      if (user) {
         if (p.ownerId && p.ownerId.toString() === user._id.toString()) isUnlocked = true;
         if (user.role === 'Admin') isUnlocked = true;
         if (unlockedPropertyIds.includes(p._id.toString())) isUnlocked = true;
      }
      return {
        ...p,
        isLocked: !isUnlocked
      };
    });

    return NextResponse.json(propertiesWithLockState);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: "Only registered users can list properties" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, rent, area, subArea, beds, bathroom, balcony, lift, parking, gas, images, address, phone, division, district } = body;
    
    const property = await Property.create({
      ownerId: user._id,
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
      images: Array.isArray(images) ? images : [],
      address,
      phone
    });

    return NextResponse.json(property, { status: 201 });
  } catch (err) {
    console.error("Failed to create property", err);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
