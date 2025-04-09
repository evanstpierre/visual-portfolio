import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/lib/users'; // mock data or real DB
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const ADMIN_ID = 1;
  const body = await req.json();
  const { password } = body;
  console.log(password)
  if (!password) {
    return NextResponse.json({ message: 'Missing password' }, { status: 400 });
  }

  const user = users.find(u => u.id === ADMIN_ID);
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  console.log(user.passwordHash)
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const token = jwt.sign(
    { id: user.id, role:"ADMIN" },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return NextResponse.json({ message: 'Login successful',  token });
}

