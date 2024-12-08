import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Remove the session cookie to log the user out
    const cookies = req.cookies;
    cookies.delete('authToken'); // Replace with your actual cookie name

    return NextResponse.json({ message: 'Signed out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error during sign-out:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
