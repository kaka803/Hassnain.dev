import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function POST(request) {
  const { email, password } = await request.json();

  if(!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
  const token = jwt.sign({
  email: email,
  password: password,
  role: 'admin'
}, process.env.JWT_SECRET, { expiresIn: '1h' });

return NextResponse.json({message: 'login successfully', token }, { status: 200 });

}