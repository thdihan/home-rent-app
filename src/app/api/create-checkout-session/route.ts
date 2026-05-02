import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getUserFromRequest } from '@/lib/auth';
import dbConnect from '@/lib/db';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getUserFromRequest(req);
    
    if (!user) {
      return NextResponse.json({ error: "Login required" }, { status: 401 });
    }
    
    if (!stripe) {
      return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
    }

    const { plan } = await req.json();
    const amount = plan === 'B' ? 500 : 200;
    const credits = plan === 'B' ? 50 : 15;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'bdt',
          product_data: { name: `Plan ${plan} Credits` },
          unit_amount: amount * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.APP_URL || 'http://localhost:3000'}?payment=success&credits=${credits}&plan=${plan}`,
      cancel_url: `${process.env.APP_URL || 'http://localhost:3000'}?payment=cancel`,
      metadata: { userId: user._id.toString(), credits: credits.toString() }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
