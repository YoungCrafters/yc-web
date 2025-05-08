'use client';

import {
	Box,
	Card,
	CardContent,
	Grid,
	Stack,
	Typography,
	Button,
} from '@mui/material';
import {
	TrendingUp as TrendingUpIcon,
	People as PeopleIcon,
	Message as MessageIcon,
	CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import MentorLayout from '@/components/Layout/MentorLayout';
import { useAuth } from '@/hooks/useAuth';
import { UserType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/mocks/endpoints';

// Mock data for upcoming sessions
const upcomingSessions = [
	{
		id: '1',
		title: 'JavaScript Fundamentals',
		date: '2024-03-25T15:00:00',
		mentorName: 'John Doe',
		menteeName: 'Alice Smith',
	},
	{
		id: '2',
		title: 'React Best Practices',
		date: '2024-03-26T16:00:00',
		mentorName: 'Jane Wilson',
		menteeName: 'Bob Johnson',
	},
];

export default function MentorDashboardPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(!!checkAuth());

	// useEffect(() => {
	// 	// Redirect if user is not logged in or is not a mentor
	// 	if (!user) {
	// 		router.push('/');
	// 	} else if (user.userType !== UserType.MENTOR) {
	// 		router.push('/mentee/dashboard');
	// 	}
	// }, [user, router]);

	// if (!user || user.userType !== UserType.MENTOR) {
	// 	return null; // or a loading spinner
	// }

	return (
		<MentorLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					{/* Welcome back, {user.name}! */}
					Welcome back, John!
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={3}>
						<Card
							elevation={0}
							sx={{
								borderRadius: 2,
								border: '1px solid',
								borderColor: 'divider',
							}}>
							<CardContent>
								<Stack spacing={2}>
									<Stack direction='row' spacing={2} alignItems='center'>
										<PeopleIcon color='primary' />
										<Typography variant='h6'>12</Typography>
									</Stack>
									<Typography variant='body2' color='text.secondary'>
										Active Mentees
									</Typography>
									<Typography
										variant='caption'
										color='success.main'
										sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
										<TrendingUpIcon fontSize='small' />
										+2 this month
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Card
							elevation={0}
							sx={{
								borderRadius: 2,
								border: '1px solid',
								borderColor: 'divider',
							}}>
							<CardContent>
								<Stack spacing={2}>
									<Stack direction='row' spacing={2} alignItems='center'>
										<MessageIcon color='primary' />
										<Typography variant='h6'>28</Typography>
									</Stack>
									<Typography variant='body2' color='text.secondary'>
										Messages
									</Typography>
									<Typography
										variant='caption'
										color='error.main'
										sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
										5 unread
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Card
							elevation={0}
							sx={{
								borderRadius: 2,
								border: '1px solid',
								borderColor: 'divider',
							}}>
							<CardContent>
								<Stack spacing={2}>
									<Stack direction='row' spacing={2} alignItems='center'>
										<CalendarIcon color='primary' />
										<Typography variant='h6'>8</Typography>
									</Stack>
									<Typography variant='body2' color='text.secondary'>
										Upcoming Sessions
									</Typography>
									<Typography
										variant='caption'
										sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
										Next: Today at 3 PM
									</Typography>
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Box sx={{ mt: 4 }}>
					<Typography variant='h6' gutterBottom>
						Upcoming Sessions
					</Typography>
					<Grid container spacing={2}>
						{upcomingSessions.map((session) => (
							<Grid item xs={12} md={6} key={session.id}>
								<Card
									elevation={0}
									sx={{
										borderRadius: 2,
										border: '1px solid',
										borderColor: 'divider',
									}}>
									<CardContent>
										<Stack spacing={2}>
											<Typography variant='subtitle1' fontWeight='medium'>
												{session.title}
											</Typography>
											<Stack direction='row' spacing={2} alignItems='center'>
												<CalendarIcon fontSize='small' color='action' />
												<Typography variant='body2'>
													{new Date(session.date).toLocaleString()}
												</Typography>
											</Stack>
											<Typography variant='body2' color='text.secondary'>
												Mentee: {session.menteeName}
											</Typography>
											<Button variant='outlined' size='small'>
												Join Session
											</Button>
										</Stack>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</MentorLayout>
	);
}
