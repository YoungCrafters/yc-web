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
	School as SchoolIcon,
	Message as MessageIcon,
	CalendarMonth as CalendarIcon,
	Search as SearchIcon,
} from '@mui/icons-material';
import MenteeLayout from '@/components/Layout/MenteeLayout';
import { useAuth } from '@/hooks/useAuth';
import { UserType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

export default function MenteeDashboardPage() {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// Redirect if user is not logged in or is not a mentee
		if (!user) {
			router.push('/');
		} else if (user.userType !== UserType.MENTEE) {
			router.push('/mentor/dashboard');
		}
	}, [user, router]);

	if (!user || user.userType !== UserType.MENTEE) {
		return null; // or a loading spinner
	}

	return (
		<MenteeLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					Welcome back, {user.name}!
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
										<SchoolIcon color='primary' />
										<Typography variant='h6'>3</Typography>
									</Stack>
									<Typography variant='body2' color='text.secondary'>
										Learning Paths
									</Typography>
									<Typography
										variant='caption'
										color='success.main'
										sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
										<TrendingUpIcon fontSize='small' />2 in progress
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
										<Typography variant='h6'>15</Typography>
									</Stack>
									<Typography variant='body2' color='text.secondary'>
										Messages
									</Typography>
									<Typography
										variant='caption'
										color='error.main'
										sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
										3 unread
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
										<Typography variant='h6'>5</Typography>
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
												Mentor: {session.mentorName}
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

				<Card
					elevation={0}
					sx={{
						mt: 4,
						p: 3,
						borderRadius: 2,
						border: '1px solid',
						borderColor: 'divider',
						bgcolor: 'primary.main',
						color: 'primary.contrastText',
					}}>
					<Grid container spacing={3} alignItems='center'>
						<Grid item xs={12} md={8}>
							<Typography variant='h6' gutterBottom>
								Find Your Perfect Mentor
							</Typography>
							<Typography variant='body2' sx={{ mb: 2, opacity: 0.8 }}>
								Connect with experienced mentors who can guide you through your
								learning journey.
							</Typography>
							<Button
								variant='contained'
								color='secondary'
								startIcon={<SearchIcon />}
								onClick={() => router.push('/mentee/find-mentor')}>
								Browse Mentors
							</Button>
						</Grid>
					</Grid>
				</Card>
			</Box>
		</MenteeLayout>
	);
}
