'use client';

import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Grid,
	Stack,
	Tab,
	Tabs,
	Typography,
} from '@mui/material';
import {
	CalendarMonth as CalendarIcon,
	AccessTime as TimeIcon,
	Person as PersonIcon,
} from '@mui/icons-material';
import MenteeLayout from '@/components/Layout/MenteeLayout';
import { useState } from 'react';

// Mock data for sessions
const mockSessions = {
	upcoming: [
		{
			id: '1',
			title: 'JavaScript Fundamentals',
			mentor: 'John Doe',
			date: '2024-03-25T15:00:00',
			duration: 60,
			status: 'scheduled',
		},
		{
			id: '2',
			title: 'React Best Practices',
			mentor: 'Jane Wilson',
			date: '2024-03-28T16:00:00',
			duration: 45,
			status: 'scheduled',
		},
	],
	past: [
		{
			id: '3',
			title: 'Introduction to Web Development',
			mentor: 'Mike Brown',
			date: '2024-03-20T14:00:00',
			duration: 60,
			status: 'completed',
			rating: 5,
		},
		{
			id: '4',
			title: 'CSS Layout Techniques',
			mentor: 'Sarah Johnson',
			date: '2024-03-18T11:00:00',
			duration: 45,
			status: 'completed',
			rating: 4,
		},
	],
};

export default function SessionsPage() {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<MenteeLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					My Sessions
				</Typography>

				<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
					<Tabs value={activeTab} onChange={handleTabChange}>
						<Tab label='Upcoming Sessions' />
						<Tab label='Past Sessions' />
					</Tabs>
				</Box>

				<Grid container spacing={2}>
					{activeTab === 0
						? mockSessions.upcoming.map((session) => (
								<Grid item xs={12} md={6} key={session.id}>
									<Card
										elevation={0}
										sx={{
											border: '1px solid',
											borderColor: 'divider',
										}}>
										<CardContent>
											<Stack spacing={2}>
												<Stack
													direction='row'
													justifyContent='space-between'
													alignItems='flex-start'>
													<Typography variant='subtitle1' fontWeight='medium'>
														{session.title}
													</Typography>
													<Chip
														label={session.status}
														color='primary'
														size='small'
													/>
												</Stack>

												<Stack spacing={1}>
													<Stack
														direction='row'
														spacing={1}
														alignItems='center'>
														<PersonIcon fontSize='small' color='action' />
														<Typography variant='body2'>
															{session.mentor}
														</Typography>
													</Stack>
													<Stack
														direction='row'
														spacing={1}
														alignItems='center'>
														<CalendarIcon fontSize='small' color='action' />
														<Typography variant='body2'>
															{formatDate(session.date)}
														</Typography>
													</Stack>
													<Stack
														direction='row'
														spacing={1}
														alignItems='center'>
														<TimeIcon fontSize='small' color='action' />
														<Typography variant='body2'>
															{formatTime(session.date)} ({session.duration}{' '}
															min)
														</Typography>
													</Stack>
												</Stack>

												<Stack direction='row' spacing={1}>
													<Button variant='contained' fullWidth>
														Join Session
													</Button>
													<Button variant='outlined' fullWidth>
														Reschedule
													</Button>
												</Stack>
											</Stack>
										</CardContent>
									</Card>
								</Grid>
						  ))
						: mockSessions.past.map((session) => (
								<Grid item xs={12} md={6} key={session.id}>
									<Card
										elevation={0}
										sx={{
											border: '1px solid',
											borderColor: 'divider',
										}}>
										<CardContent>
											<Stack spacing={2}>
												<Stack
													direction='row'
													justifyContent='space-between'
													alignItems='flex-start'>
													<Typography variant='subtitle1' fontWeight='medium'>
														{session.title}
													</Typography>
													<Typography variant='body2' color='text.secondary'>
														{'⭐'.repeat(session.rating)}
													</Typography>
												</Stack>

												<Stack spacing={1}>
													<Stack
														direction='row'
														spacing={1}
														alignItems='center'>
														<PersonIcon fontSize='small' color='action' />
														<Typography variant='body2'>
															{session.mentor}
														</Typography>
													</Stack>
													<Stack
														direction='row'
														spacing={1}
														alignItems='center'>
														<CalendarIcon fontSize='small' color='action' />
														<Typography variant='body2'>
															{formatDate(session.date)}
														</Typography>
													</Stack>
													<Stack
														direction='row'
														spacing={1}
														alignItems='center'>
														<TimeIcon fontSize='small' color='action' />
														<Typography variant='body2'>
															{formatTime(session.date)} ({session.duration}{' '}
															min)
														</Typography>
													</Stack>
												</Stack>

												<Button variant='outlined' fullWidth>
													View Notes
												</Button>
											</Stack>
										</CardContent>
									</Card>
								</Grid>
						  ))}
				</Grid>
			</Box>
		</MenteeLayout>
	);
}
