import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const authToken = (await cookies()).get('auth_token')?.value;
    console.log('check-auth: authToken present?', !!authToken);
    if (authToken) {
      console.log('check-auth: authToken value:', authToken);
    }

    if (!authToken) {
      console.log('check-auth: No authToken found, returning unauthenticated.');
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'; // TODO: Ensure this matches the secret used for signing
    console.log('check-auth: jwtSecret used:', jwtSecret);

    try {
      jwt.verify(authToken, jwtSecret as string);
      console.log('check-auth: JWT verified successfully, returning authenticated.');
      return NextResponse.json({ isAuthenticated: true });
    } catch (error) {
      console.error('check-auth: JWT verification failed:', error);
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
  } catch (error) {
    console.error('Error in check-auth API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}