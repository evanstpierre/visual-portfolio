import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import info from '@/lib/info.json'; 
import { connectDB } from '@/lib/mongodb';
import Profile from '@/app/models/Profile';


const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // Replace with your secret


export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const doc = await Profile.findOne().lean(); // first (and only) seeded doc
    if (!doc) return NextResponse.json({ error: "No profile found" }, { status: 404 });

    return NextResponse.json({ data: doc }, { status: 200 });
  } catch (err) {
    console.error("❌ GET /api/profile error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   await connectDB();

//   const data =info;
//   return NextResponse.json({data});
// }

// PUT handler
export async function PUT(req: NextRequest) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });
    }
  
    // 1. Get cookie header
    const headerList = headers();
    const cookieHeader = (await headerList).get('cookie') || '';
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch?.[1];
  
    if (!token) {
      return NextResponse.json({ message: 'No token found in cookies' }, { status: 401 });
    }
  
    try {
      // 2. Verify JWT
      const decoded = jwt.verify(token, jwtSecret);
      // 3. Parse request body
      const body = await req.json();
  
      // 4. Update logic (mocked with in-memory update)
      Object.assign(info, body); // Replace this with DB update if needed
  
      return NextResponse.json({ message: 'Update successful', updated: info });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
  }