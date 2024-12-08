// app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

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

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await usersCollection.insertOne({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error during sign-up:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  } finally {
    await client.close();
  }
}
