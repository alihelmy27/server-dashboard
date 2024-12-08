import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const serversFilePath = path.join(process.cwd(), '/app/data', 'servers.json');

export async function GET() {
  try {
    const fileData = await fs.readFile(serversFilePath, 'utf-8');
    const servers = JSON.parse(fileData);

    // Make sure the data is an array
    if (Array.isArray(servers)) {
      return NextResponse.json(servers, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'Invalid server data format' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error reading servers file:', error);
    return NextResponse.json(
      { message: 'Error fetching server data' },
      { status: 500 }
    );
  }
}
