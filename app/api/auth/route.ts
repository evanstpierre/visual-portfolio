import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });
  }

  const headerList = await headers();
  const cookieHeader = headerList.get('cookie') || '';
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) {
    return NextResponse.json({ message: 'No token found in cookies' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}