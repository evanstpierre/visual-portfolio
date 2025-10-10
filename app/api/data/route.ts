import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import Profile from '@/app/models/Profile';
import { update } from 'lodash';


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



// // PUT handler
// export async function PUT(req: NextRequest) {
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });
//     }
  
//     // 1. Get cookie header
//     const headerList = headers();
//     const cookieHeader = (await headerList).get('cookie') || '';
//     const tokenMatch = cookieHeader.match(/token=([^;]+)/);
//     const token = tokenMatch?.[1];
  
//     if (!token) {
//       return NextResponse.json({ message: 'No token found in cookies' }, { status: 401 });
//     }
  
//     try {
//       // 2. Verify JWT
//       const decoded = jwt.verify(token, jwtSecret);
//       // 3. Parse request body
//       const body = await req.json();
//       console.log(body)
//       // 4. Update logic (mocked with in-memory update)
//       Object.assign(info, body); // Replace this with DB update if needed
  
//       return NextResponse.json({ message: 'Update successful', updated: info });
//     } catch (err) {
//       console.error(err);
//       return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
//     }
//   }

export async function PUT(req: NextRequest) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json({ message: "Missing JWT secret" }, { status: 500 });
  }

  // headers() is sync; no await
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

  await connectDB();

  // Expect the full (or partial) profile object
  const payload = await req.json();
  console.log(payload)

  // Always enforce the seed key so the doc is uniquely addressable
  payload._seedKey = "profile_v1";

  // Use findOneAndUpdate to return the updated document
  const updated = await Profile.findOneAndUpdate(
    { _seedKey: "profile_v1" },
    { $set: payload },
    { upsert: true, returnDocument: "after" }
  ).lean();

  return NextResponse.json({ message: "Update successful", updated});
}