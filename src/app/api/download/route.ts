import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const authToken = (await cookieStore).get('auth_token')?.value;
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!authToken || !file) {
      return NextResponse.json({ message: 'Authentication token and file are required' }, { status: 400 });
    }

    const jwtSecret = process.env.JWT_SECRET 

    try {
      jwt.verify(authToken, jwtSecret as string);
    } catch (error) {
      console.error('JWT verification failed for download:', error);
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    const filePath = path.join(process.cwd(), 'public', file);
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `inline; filename="${path.basename(filePath)}"`, // Display in browser with filename hint
        'Content-Type': 'application/pdf', // Ensure correct MIME type
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
