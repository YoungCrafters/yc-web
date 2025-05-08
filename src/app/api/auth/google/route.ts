import { NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/googleCalendar';

export async function GET() {
  const calendarService = new GoogleCalendarService();
  const authUrl = calendarService.getAuthUrl();
  
  return NextResponse.json({ authUrl });
} 