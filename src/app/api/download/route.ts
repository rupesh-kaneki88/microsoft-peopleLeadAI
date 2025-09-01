import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

// Define the path for the temporary tokens database
const tokensFilePath = path.join(process.cwd(), 'tokens.json');

// In-memory cache for tokens to avoid reading the file on every request
let tokensCache: any = null;

async function readTokens() {
  if (tokensCache) {
    return tokensCache;
  }
  try {
    const data = await fs.readFile(tokensFilePath, 'utf-8');
    tokensCache = JSON.parse(data);
    return tokensCache;
  } catch (error) {
    // If the file doesn't exist, return an empty object
    return {};
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!token || !file) {
      return NextResponse.json({ message: 'Token and file are required' }, { status: 400 });
    }

    const tokens = await readTokens();
    const tokenData = tokens[token];

    if (!tokenData || tokenData.expirationTime < Date.now()) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', file);
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
        'Content-Type': 'application/pdf', // Assuming all files are PDFs for this example
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
