import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alihelmy6:ZUrzpN6WKGauPzXs@users.ryfnm.mongodb.net/?retryWrites=true&w=majority&appName=Users';
const client = new MongoClient(MONGODB_URI);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const db = client.db('Dashboard');
    const usersCollection = db.collection('Users');

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key', // Ensure you have a JWT secret in your .env file
      { expiresIn: '1h' }
    );

    return NextResponse.json({ message: 'Sign-in successful', token }, { status: 200 });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  } finally {
    await client.close();
  }
}
