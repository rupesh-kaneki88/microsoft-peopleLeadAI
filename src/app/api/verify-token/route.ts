import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    console.log('verify-token: Token received:', token);

    if (!token) {
      console.log('verify-token: No token found, returning 400.');
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'; // TODO: Use a strong secret from environment variables
    console.log('verify-token: jwtSecret used:', jwtSecret);

    try {
      const decoded = jwt.verify(token, jwtSecret as string) as jwt.JwtPayload;
      console.log('verify-token: JWT decoded successfully:', decoded);

      if (!decoded.email) {
        console.log('verify-token: Decoded JWT missing email, returning 400.');
        return NextResponse.json({ message: 'Invalid token payload' }, { status: 400 });
      }

      const url = new URL(request.url);
      const baseUrl = `${url.protocol}//${url.host}`;

      // Set the auth_token cookie
      const response = NextResponse.redirect(`${baseUrl}/verify-success`);
      console.log('verify-token: Setting auth_token cookie with value:', token);
      response.cookies.set('auth_token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 1 * 60 * 60 * 1000 }); // 1 hours
      return response;
    } catch (error) {
      console.error('verify-token: JWT verification error:', error);
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
