import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return NextResponse.json({ message: 'Missing JWT secret' }, { status: 500 });
  }

  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return (NextResponse.json{ user: decoded }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}