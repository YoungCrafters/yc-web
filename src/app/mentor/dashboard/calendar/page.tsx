'use client';

import { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Stack,
	TextField,
	Typography,
	Alert,
	Autocomplete,
} from '@mui/material';
import { Add as AddIcon, Google as GoogleIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MentorLayout from '@/components/Layout/MentorLayout';
import { format, startOfMonth, endOfMonth, addHours } from 'date-fns';

interface CalendarEvent {
	id: string;
	title: string;
	description?: string;
	startTime: Date;
	endTime: Date;
	mentee?: string;
}

// Mock data for mentees
const mockMentees = [
	{ id: '1', name: 'Alice Smith', email: 'alice@example.com' },
	{ id: '2', name: 'Bob Johnson', email: 'bob@example.com' },
	{ id: '3', name: 'Carol Williams', email: 'carol@example.com' },
];

export default function CalendarPage() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [selectedMentee, setSelectedMentee] = useState<{
		id: string;
		name: string;
		email: string;
	} | null>(null);
	const [newEvent, setNewEvent] = useState({
		title: '',
		description: '',
		startTime: new Date(),
		endTime: addHours(new Date(), 1),
	});

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch('/api/calendar/check-auth');
				const data = await response.json();
				setIsAuthenticated(data.isAuthenticated);
				if (data.isAuthenticated) {
					fetchEvents();
				}
			} catch (error) {
				console.error('Error checking auth:', error);
				setError('Failed to check authentication status');
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const fetchEvents = async () => {
		try {
			setIsLoading(true);
			const timeMin = startOfMonth(currentDate);
			const timeMax = endOfMonth(currentDate);

			const response = await fetch(
				`/api/calendar/events?timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}`
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to fetch events');
			}

			setEvents(
				data.events.map((event: any) => ({
					id: event.id,
					title: event.summary,
					description: event.description,
					startTime: new Date(event.start.dateTime),
					endTime: new Date(event.end.dateTime),
				}))
			);
		} catch (error) {
			console.error('Error fetching events:', error);
			setError('Failed to fetch events');
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleAuth = async () => {
		try {
			const response = await fetch('/api/auth/google');
			const data = await response.json();
			window.location.href = data.authUrl;
		} catch (error) {
			console.error('Error initiating Google auth:', error);
			setError('Failed to initiate Google authentication');
		}
	};

	const handleNewEvent = () => {
		if (!isAuthenticated) {
			handleGoogleAuth();
			return;
		}
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setNewEvent({
			title: '',
			description: '',
			startTime: new Date(),
			endTime: addHours(new Date(), 1),
		});
		setSelectedMentee(null);
	};

	const handleCreateEvent = async () => {
		if (!selectedMentee) {
			setError('Please select a mentee');
			return;
		}

		try {
			const response = await fetch('/api/calendar/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...newEvent,
					attendees: [selectedMentee.email],
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create event');
			}

			handleCloseDialog();
			fetchEvents();
		} catch (error) {
			console.error('Error creating event:', error);
			setError('Failed to create event');
		}
	};

	const eventsForSelectedDate = selectedDate
		? events.filter(
				(event) =>
					format(event.startTime, 'yyyy-MM-dd') ===
					format(selectedDate, 'yyyy-MM-dd')
		  )
		: [];

	if (isLoading) {
		return (
			<MentorLayout>
				<Box>
					<Typography>Loading calendar...</Typography>
				</Box>
			</MentorLayout>
		);
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MentorLayout>
				<Box>
					<Stack
						direction='row'
						justifyContent='space-between'
						alignItems='center'
						mb={3}>
						<Typography variant='h5' fontWeight='bold'>
							Calendar
						</Typography>
						<Button
							variant='contained'
							startIcon={isAuthenticated ? <AddIcon /> : <GoogleIcon />}
							onClick={handleNewEvent}>
							{isAuthenticated ? 'Schedule Session' : 'Connect Google Calendar'}
						</Button>
					</Stack>

					{error && (
						<Alert severity='error' sx={{ mb: 3 }}>
							{error}
						</Alert>
					)}

					<Grid container spacing={3}>
						{/* Calendar */}
						<Grid item xs={12} md={8}>
							<Card>
								<Box sx={{ p: 2 }}>
									<DateCalendar
										value={selectedDate}
										onChange={(newValue: Date | null) =>
											setSelectedDate(newValue)
										}
										sx={{ width: '100%' }}
									/>
								</Box>
							</Card>
						</Grid>

						{/* Events for Selected Date */}
						<Grid item xs={12} md={4}>
							<Card>
								<Box sx={{ p: 2 }}>
									<Typography variant='h6' gutterBottom>
										{selectedDate
											? format(selectedDate, 'MMMM d, yyyy')
											: 'Select a date'}
									</Typography>
									{selectedDate && (
										<Stack spacing={2}>
											{eventsForSelectedDate.length > 0 ? (
												eventsForSelectedDate.map((event) => (
													<Card key={event.id} variant='outlined' sx={{ p: 2 }}>
														<Typography variant='subtitle1'>
															{event.title}
														</Typography>
														{event.description && (
															<Typography
																variant='body2'
																color='text.secondary'>
																{event.description}
															</Typography>
														)}
														<Typography variant='body2' color='text.secondary'>
															{format(event.startTime, 'h:mm a')} -{' '}
															{format(event.endTime, 'h:mm a')}
														</Typography>
													</Card>
												))
											) : (
												<Typography color='text.secondary'>
													No events scheduled
												</Typography>
											)}
										</Stack>
									)}
								</Box>
							</Card>
						</Grid>
					</Grid>

					{/* New Event Dialog */}
					<Dialog open={isDialogOpen} onClose={handleCloseDialog}>
						<DialogTitle>Schedule New Session</DialogTitle>
						<DialogContent>
							<Stack spacing={3} sx={{ mt: 1 }}>
								<TextField
									label='Session Title'
									fullWidth
									value={newEvent.title}
									onChange={(e) =>
										setNewEvent({ ...newEvent, title: e.target.value })
									}
								/>
								<TextField
									label='Description'
									fullWidth
									multiline
									rows={3}
									value={newEvent.description}
									onChange={(e) =>
										setNewEvent({ ...newEvent, description: e.target.value })
									}
								/>
								<Autocomplete
									options={mockMentees}
									getOptionLabel={(option) =>
										`${option.name} (${option.email})`
									}
									value={selectedMentee}
									onChange={(_, newValue) => setSelectedMentee(newValue)}
									renderInput={(params) => (
										<TextField {...params} label='Select Mentee' />
									)}
								/>
								<DateCalendar
									value={newEvent.startTime}
									onChange={(newValue: Date | null) => {
										if (newValue) {
											const newStartTime = new Date(newValue);
											newStartTime.setHours(
												newEvent.startTime.getHours(),
												newEvent.startTime.getMinutes()
											);
											const newEndTime = addHours(newStartTime, 1);
											setNewEvent({
												...newEvent,
												startTime: newStartTime,
												endTime: newEndTime,
											});
										}
									}}
								/>
								<Stack direction='row' spacing={2}>
									<TimePicker
										label='Start Time'
										value={newEvent.startTime}
										onChange={(newValue: Date | null) => {
											if (newValue) {
												setNewEvent({
													...newEvent,
													startTime: newValue,
													endTime: addHours(newValue, 1),
												});
											}
										}}
									/>
									<TimePicker
										label='End Time'
										value={newEvent.endTime}
										onChange={(newValue: Date | null) => {
											if (newValue) {
												setNewEvent({
													...newEvent,
													endTime: newValue,
												});
											}
										}}
									/>
								</Stack>
							</Stack>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog}>Cancel</Button>
							<Button
								variant='contained'
								onClick={handleCreateEvent}
								disabled={!newEvent.title || !selectedMentee}>
								Schedule
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			</MentorLayout>
		</LocalizationProvider>
	);
}
