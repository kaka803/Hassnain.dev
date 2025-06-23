import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';



export async function POST(req) {
  
    const { token } = await req.json();
    console.log('token', token);
    

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: 'Token is valid', user: decoded }, { status: 200 });
  
}
