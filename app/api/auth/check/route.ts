import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('authToken'); // Check if there is a session cookie
    if (session) {
      return NextResponse.json({ message: 'Authenticated' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
