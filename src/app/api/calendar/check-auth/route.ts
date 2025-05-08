import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('calendar_access_token');
  
  return NextResponse.json({
    isAuthenticated: !!accessToken?.value
  });
} 