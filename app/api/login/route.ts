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

  return NextResponse.json({ message: 'Login successful' });
}

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const ADMIN_ID = 1
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const {password } = req.body;

//   if ( !password) {
//     return res.status(400).json({ message: 'Missing password' });
//   }

//   const user = users.find(u => u.id === ADMIN_ID);
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid login' });
//   }
  
//   const isValid = await bcrypt.compare(password, user.passwordHash);

//   if (!isValid) {
//     return res.status(401).json({ message: 'Invalid login' });
//   }

//   const token = jwt.sign(
//     { id: user.id, },
//     process.env.JWT_SECRET!, // set in .env.local
//     { expiresIn: '30m' }
//   );
  
//   // ✅ Success — return a token or session info
//   return res.status(200).json({
//     message: 'Login successful',
//     token: token,
//     // user: { id: user.id, email: user.email },
//     // optionally include a JWT token here
//   });
// }