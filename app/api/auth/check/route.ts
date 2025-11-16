import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';

export async function GET() {
  const session = await getCurrentSession();
  
  if (session) {
    return NextResponse.json({ authenticated: true });
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

