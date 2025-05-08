import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('calendar_access_token')?.value;
  
  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const timeMin = searchParams.get('timeMin');
  const timeMax = searchParams.get('timeMax');

  if (!timeMin || !timeMax) {
    return NextResponse.json(
      { error: 'Missing timeMin or timeMax parameters' },
      { status: 400 }
    );
  }

  try {
    const calendarService = new GoogleCalendarService();
    const events = await calendarService.listEvents(
      accessToken,
      new Date(timeMin),
      new Date(timeMax)
    );

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('calendar_access_token')?.value;
  
  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, startTime, endTime, attendees } = body;

    const calendarService = new GoogleCalendarService();
    const event = await calendarService.createEvent(accessToken, {
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      attendees,
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 