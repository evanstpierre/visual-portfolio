import bcrypt from 'bcryptjs';
import { users } from '@/lib/users'; // mock data or real DB
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const ADMIN_ID = 1;
  const body = await req.json();
  const { password } = body;

  if (!password) {
    return NextResponse.json({ message: 'Missing password' }, { status: 400 });
  }

  const user = users.find(u => u.id === ADMIN_ID);
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // 🔐 Create JWT
  const token = jwt.sign(
    { id: user.id, role: "ADMIN" },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  // ✅ Set HttpOnly cookie
  const response = NextResponse.json({ message: 'Login successful' });
  response.headers.set(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    })
  );

  return response;
}

