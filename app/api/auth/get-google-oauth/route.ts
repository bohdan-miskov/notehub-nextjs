import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = `${process.env.NEXT_API_URL}auth/get-google-oauth`;

  return NextResponse.json({ url: backendUrl });
}
