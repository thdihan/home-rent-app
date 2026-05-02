import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';
import { Property } from '@/models/Property';
import { Unlock } from '@/models/Unlock';

export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Not allowed in production' }, { status: 403 });
  }

  try {
    await dbConnect();
    
    await Property.deleteMany({});
    await User.deleteMany({});
    await Unlock.deleteMany({});
    
    const hashedPassword = await bcrypt.hash("password123", 10);
    const admin = await User.create({ email: "admin@example.com", password: hashedPassword, role: "Admin" });
    const user = await User.create({ email: "user@example.com", password: hashedPassword, role: "User" });
    
    await Property.create([
      { title: "Premium Flat in Gulshan 2", rent: 65000, division: "Dhaka", district: "Dhaka", area: "Gulshan", subArea: "Gulshan 2", beds: 4, bathroom: 4, balcony: 3, lift: "yes", parking: "yes", gas: "postpaid", images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"], address: "Road 78, Gulshan 2", phone: "01755555555", ownerId: user._id },
      { title: "Modern Studio in Uttara", rent: 18000, division: "Dhaka", district: "Dhaka", area: "Uttara", subArea: "Sector 3", beds: 1, bathroom: 1, balcony: 1, lift: "yes", parking: "no", gas: "cylinder", images: ["https://images.unsplash.com/photo-1536376074432-fd0258926aed?w=800&q=80"], address: "Sector 3, Road 18", phone: "01866666666", ownerId: user._id },
      { title: "Family House in Chittagong", rent: 25000, division: "Chittagong", district: "Chittagong", area: "Nasirabad", beds: 3, bathroom: 3, balcony: 2, lift: "no", parking: "yes", gas: "prepaid", images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"], address: "Nasirabad Housing Society", phone: "01977777777", ownerId: user._id },
      { title: "Spacious Flat in Mirpur", rent: 15000, division: "Dhaka", district: "Dhaka", area: "Mirpur", beds: 3, bathroom: 2, balcony: 2, lift: "yes", parking: "no", gas: "prepaid", images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"], address: "Plot 12, Road 4, Mirpur 12", phone: "01711111111", ownerId: user._id },
      { title: "Luxury Apartment in Banani", rent: 45000, division: "Dhaka", district: "Dhaka", area: "Banani", subArea: "Block H", beds: 4, bathroom: 4, balcony: 3, lift: "yes", parking: "yes", gas: "postpaid", images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"], address: "Road 11, Block H, Banani", phone: "01822222222", ownerId: user._id },
      { title: "Cozy Studio in Dhanmondi", rent: 12000, division: "Dhaka", district: "Dhaka", area: "Dhanmondi", subArea: "Section 32", beds: 1, bathroom: 1, balcony: 1, lift: "no", parking: "no", gas: "cylinder", images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"], address: "Dhanmondi 32, near Lake", phone: "01933333333", ownerId: user._id },
      { title: "Elegant Residence in Sylhet", rent: 22000, division: "Sylhet", district: "Sylhet", area: "Zindabazar", beds: 3, bathroom: 2, balcony: 2, lift: "yes", parking: "yes", gas: "prepaid", images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"], address: "Zindabazar Central", phone: "01588888888", ownerId: user._id },
      { title: "Waterfront View in Khulna", rent: 16000, division: "Khulna", district: "Khulna", area: "Khalishpur", beds: 2, bathroom: 2, balcony: 2, lift: "no", parking: "yes", gas: "cylinder", images: ["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800&q=80"], address: "Bhairab River Side", phone: "01399999999", ownerId: user._id },
      { title: "Sadar Road Apartment", rent: 14000, division: "Barisal", district: "Barisal", area: "Sadar Road", beds: 2, bathroom: 1, balcony: 1, lift: "yes", parking: "no", gas: "postpaid", images: ["https://images.unsplash.com/photo-1556912177-d0d575084920?w=800&q=80"], address: "Barisal City Center", phone: "01422222222", ownerId: user._id },
      { title: "Saheb Bazar Studio", rent: 11000, division: "Rajshahi", district: "Rajshahi", area: "Saheb Bazar", beds: 1, bathroom: 1, balcony: 1, lift: "no", parking: "no", gas: "cylinder", images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"], address: "Rajshahi Town", phone: "01633333333", ownerId: user._id },
      { title: "Dhap Family Home", rent: 19000, division: "Rangpur", district: "Rangpur", area: "Dhap", beds: 3, bathroom: 2, balcony: 2, lift: "no", parking: "yes", gas: "prepaid", images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"], address: "Medical College Road", phone: "01744444444", ownerId: user._id },
      { title: "Mymensingh Central Flat", rent: 13000, division: "Mymensingh", district: "Mymensingh", area: "Ganginarpar", beds: 2, bathroom: 1, balcony: 1, lift: "yes", parking: "no", gas: "postpaid", images: ["https://images.unsplash.com/photo-1580587767503-3997489ceb7a?w=800&q=80"], address: "Ganginarpar Square", phone: "01855555555", ownerId: user._id },
      { title: "Cox's Bazar Beach View", rent: 35000, division: "Chittagong", district: "Cox's Bazar", area: "Kalatoli", beds: 2, bathroom: 2, balcony: 2, lift: "yes", parking: "yes", gas: "prepaid", images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80"], address: "Marine Drive Road", phone: "01966666666", ownerId: user._id },
      { title: "Gazipur Industrial Studio", rent: 9000, division: "Dhaka", district: "Gazipur", area: "Board Bazar", beds: 1, bathroom: 1, balcony: 0, lift: "no", parking: "no", gas: "cylinder", images: ["https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80"], address: "Board Bazar Chowrasta", phone: "01377777777", ownerId: user._id },
    ]);
    
    return NextResponse.json({ message: "Seeded database successfully" });
  } catch (err) {
    console.error("Seeding failed:", err);
    return NextResponse.json({ error: "Seeding failed", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
