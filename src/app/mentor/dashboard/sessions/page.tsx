'use client';

import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Stack,
	Typography,
	Tabs,
	Tab,
	Button,
	Chip,
	Avatar,
} from '@mui/material';
import {
	CalendarMonth as CalendarIcon,
	AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import MentorLayout from '@/components/Layout/MentorLayout';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

// Mock data for sessions
const upcomingSessions = [
	{
		id: '1',
		title: 'JavaScript Fundamentals',
		mentee: {
			name: 'Alice Smith',
			avatar: 'https://i.pravatar.cc/150?img=1',
		},
		date: '2024-03-25T15:00:00',
		duration: 60,
		status: 'scheduled',
	},
	{
		id: '2',
		title: 'React Best Practices',
		mentee: {
			name: 'Bob Johnson',
			avatar: 'https://i.pravatar.cc/150?img=2',
		},
		date: '2024-03-26T16:00:00',
		duration: 45,
		status: 'confirmed',
	},
];

const pastSessions = [
	{
		id: '3',
		title: 'TypeScript Introduction',
		mentee: {
			name: 'Carol Williams',
			avatar: 'https://i.pravatar.cc/150?img=3',
		},
		date: '2024-03-20T14:00:00',
		duration: 60,
		status: 'completed',
		rating: 5,
		feedback:
			'Great session! The concepts were explained clearly and I feel much more confident with TypeScript now.',
	},
	{
		id: '4',
		title: 'Node.js Basics',
		mentee: {
			name: 'David Brown',
			avatar: 'https://i.pravatar.cc/150?img=4',
		},
		date: '2024-03-18T15:30:00',
		duration: 45,
		status: 'completed',
		rating: 4,
		feedback:
			'Very helpful session. Would love to dive deeper into advanced topics in the next session.',
	},
];

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`sessions-tabpanel-${index}`}
			aria-labelledby={`sessions-tab-${index}`}
			{...other}>
			{value === index && <Box sx={{ py: 3 }}>{children}</Box>}
		</div>
	);
}

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
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
	};

	return (
		<MentorLayout>
			<Box>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					mb={3}>
					<Typography variant='h5' fontWeight='bold'>
						Sessions
					</Typography>
					<Button variant='contained' startIcon={<CalendarIcon />}>
						Schedule New Session
					</Button>
				</Stack>

				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={activeTab} onChange={handleTabChange}>
						<Tab label='Upcoming Sessions' />
						<Tab label='Past Sessions' />
					</Tabs>
				</Box>

				<TabPanel value={activeTab} index={0}>
					<Grid container spacing={3}>
						{upcomingSessions.map((session) => (
							<Grid item xs={12} md={6} key={session.id}>
								<Card>
									<CardContent>
										<Stack spacing={2}>
											<Stack direction='row' spacing={2} alignItems='center'>
												<Avatar
													src={session.mentee.avatar}
													alt={session.mentee.name}
												/>
												<Box>
													<Typography variant='subtitle1' fontWeight='medium'>
														{session.title}
													</Typography>
													<Typography variant='body2' color='text.secondary'>
														with {session.mentee.name}
													</Typography>
												</Box>
											</Stack>

											<Stack direction='row' spacing={2} alignItems='center'>
												<CalendarIcon color='action' fontSize='small' />
												<Typography variant='body2'>
													{formatDate(session.date)}
												</Typography>
											</Stack>

											<Stack direction='row' spacing={2} alignItems='center'>
												<AccessTimeIcon color='action' fontSize='small' />
												<Typography variant='body2'>
													{formatTime(session.date)} ({session.duration} min)
												</Typography>
											</Stack>

											<Stack direction='row' spacing={1}>
												<Chip
													label={session.status}
													color={
														session.status === 'confirmed'
															? 'success'
															: 'default'
													}
													size='small'
												/>
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
						))}
					</Grid>
				</TabPanel>

				<TabPanel value={activeTab} index={1}>
					<Grid container spacing={3}>
						{pastSessions.map((session) => (
							<Grid item xs={12} md={6} key={session.id}>
								<Card>
									<CardContent>
										<Stack spacing={2}>
											<Stack direction='row' spacing={2} alignItems='center'>
												<Avatar
													src={session.mentee.avatar}
													alt={session.mentee.name}
												/>
												<Box>
													<Typography variant='subtitle1' fontWeight='medium'>
														{session.title}
													</Typography>
													<Typography variant='body2' color='text.secondary'>
														with {session.mentee.name}
													</Typography>
												</Box>
											</Stack>

											<Stack direction='row' spacing={2} alignItems='center'>
												<CalendarIcon color='action' fontSize='small' />
												<Typography variant='body2'>
													{formatDate(session.date)}
												</Typography>
											</Stack>

											<Stack direction='row' spacing={2} alignItems='center'>
												<AccessTimeIcon color='action' fontSize='small' />
												<Typography variant='body2'>
													{formatTime(session.date)} ({session.duration} min)
												</Typography>
											</Stack>

											<Box>
												<Typography
													variant='body2'
													color='text.secondary'
													gutterBottom>
													Rating: {'⭐'.repeat(session.rating)}
												</Typography>
												<Typography variant='body2' color='text.secondary'>
													Feedback:
												</Typography>
												<Typography variant='body2'>
													{session.feedback}
												</Typography>
											</Box>

											<Button variant='outlined' fullWidth>
												View Notes
											</Button>
										</Stack>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</TabPanel>
			</Box>
		</MentorLayout>
	);
}
