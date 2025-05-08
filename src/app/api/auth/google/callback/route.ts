import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const calendarService = new GoogleCalendarService();
    const tokens = await calendarService.getAccessToken(code);
    
    // In a real application, you would want to store these tokens securely,
    // either in a database or encrypted in a secure cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('calendar_access_token', tokens.access_token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 // 1 hour
    });
    
    if (tokens.refresh_token) {
      response.cookies.set('calendar_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });
    }
    
    // Redirect back to the calendar page
    return NextResponse.redirect(new URL('/mentee/dashboard/calendar', request.url));
  } catch (error) {
    console.error('Error getting access token:', error);
    return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
  }
} 