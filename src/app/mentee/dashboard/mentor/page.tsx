'use client';

import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	LinearProgress,
	Stack,
	Typography,
} from '@mui/material';
import {
	Email as EmailIcon,
	CalendarMonth as CalendarIcon,
	AccessTime as TimeIcon,
} from '@mui/icons-material';
import MenteeLayout from '@/components/Layout/MenteeLayout';

// Mock data for mentor
const mockMentor = {
	id: '1',
	name: 'John Doe',
	title: 'Senior Software Engineer',
	company: 'Tech Corp',
	experience: 8,
	skills: ['JavaScript', 'React', 'Node.js', 'Python', 'System Design'],
	rating: 4.8,
	reviews: 24,
	avatarUrl: 'https://i.pravatar.cc/150?img=1',
	bio: 'Experienced software engineer with a passion for mentoring. Specialized in full-stack development and helping others grow in their tech careers.',
	nextSession: {
		date: '2024-03-25T15:00:00',
		duration: 60,
	},
	progress: {
		completed: 12,
		total: 16,
		currentTopic: 'Advanced React Patterns',
	},
};

// Mock data for recent interactions
const recentInteractions = [
	{
		id: '1',
		type: 'session' as const,
		title: 'JavaScript Fundamentals',
		date: '2024-03-20T14:00:00',
		duration: 60,
		rating: 5,
	},
	{
		id: '2',
		type: 'feedback' as const,
		title: 'Code Review Feedback',
		date: '2024-03-18T10:00:00',
		content: 'Great progress on implementing the authentication system.',
	},
	{
		id: '3',
		type: 'session' as const,
		title: 'React Component Design',
		date: '2024-03-15T16:00:00',
		duration: 45,
		rating: 5,
	},
];

type Interaction = {
	id: string;
	title: string;
	date: string;
} & (
	| {
			type: 'session';
			duration: number;
			rating: number;
	  }
	| {
			type: 'feedback';
			content: string;
	  }
);

export default function MyMentorPage() {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatTime = (dateString: string) => {
		return new Date(dateString).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<MenteeLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					My Mentor
				</Typography>

				<Grid container spacing={3}>
					{/* Mentor Profile Card */}
					<Grid item xs={12} md={4}>
						<Card
							elevation={0}
							sx={{ border: '1px solid', borderColor: 'divider' }}>
							<CardContent>
								<Stack spacing={3} alignItems='center'>
									<Avatar
										src={mockMentor.avatarUrl}
										alt={mockMentor.name}
										sx={{ width: 120, height: 120 }}
									/>
									<Box textAlign='center'>
										<Typography variant='h6'>{mockMentor.name}</Typography>
										<Typography variant='body2' color='text.secondary'>
											{mockMentor.title}
										</Typography>
										<Typography
											variant='body2'
											color='text.secondary'
											gutterBottom>
											{mockMentor.company}
										</Typography>
										<Typography variant='body2'>
											⭐ {mockMentor.rating} ({mockMentor.reviews} reviews)
										</Typography>
									</Box>

									<Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
										{mockMentor.skills.map((skill) => (
											<Chip key={skill} label={skill} size='small' />
										))}
									</Stack>

									<Button
										startIcon={<EmailIcon />}
										variant='contained'
										fullWidth>
										Message Mentor
									</Button>
								</Stack>
							</CardContent>
						</Card>
					</Grid>

					{/* Progress and Interactions */}
					<Grid item xs={12} md={8}>
						<Stack spacing={3}>
							{/* Progress Card */}
							<Card
								elevation={0}
								sx={{ border: '1px solid', borderColor: 'divider' }}>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										Learning Progress
									</Typography>
									<Stack spacing={2}>
										<Box>
											<Typography variant='body2' gutterBottom>
												Current Topic: {mockMentor.progress.currentTopic}
											</Typography>
											<LinearProgress
												variant='determinate'
												value={
													(mockMentor.progress.completed /
														mockMentor.progress.total) *
													100
												}
												sx={{ height: 8, borderRadius: 4 }}
											/>
										</Box>
										<Typography variant='body2' color='text.secondary'>
											{mockMentor.progress.completed} of{' '}
											{mockMentor.progress.total} milestones completed
										</Typography>
									</Stack>
								</CardContent>
							</Card>

							{/* Next Session Card */}
							<Card
								elevation={0}
								sx={{ border: '1px solid', borderColor: 'divider' }}>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										Next Session
									</Typography>
									<Stack spacing={2}>
										<Stack direction='row' spacing={1} alignItems='center'>
											<CalendarIcon color='action' />
											<Typography>
												{formatDate(mockMentor.nextSession.date)}
											</Typography>
										</Stack>
										<Stack direction='row' spacing={1} alignItems='center'>
											<TimeIcon color='action' />
											<Typography>
												{formatTime(mockMentor.nextSession.date)} (
												{mockMentor.nextSession.duration} min)
											</Typography>
										</Stack>
										<Button variant='contained'>Join Session</Button>
									</Stack>
								</CardContent>
							</Card>

							{/* Recent Interactions */}
							<Card
								elevation={0}
								sx={{ border: '1px solid', borderColor: 'divider' }}>
								<CardContent>
									<Typography variant='h6' gutterBottom>
										Recent Interactions
									</Typography>
									<Stack divider={<Divider />} spacing={2}>
										{recentInteractions.map((interaction: Interaction) => (
											<Box key={interaction.id}>
												<Stack
													direction='row'
													justifyContent='space-between'
													alignItems='flex-start'>
													<Box>
														<Typography variant='subtitle2'>
															{interaction.title}
														</Typography>
														<Typography variant='body2' color='text.secondary'>
															{formatDate(interaction.date)}
														</Typography>
													</Box>
													{interaction.type === 'session' && (
														<Typography variant='body2'>
															{'⭐'.repeat(interaction.rating)}
														</Typography>
													)}
												</Stack>
												{interaction.type === 'feedback' && (
													<Typography
														variant='body2'
														color='text.secondary'
														sx={{ mt: 1 }}>
														{interaction.content}
													</Typography>
												)}
											</Box>
										))}
									</Stack>
								</CardContent>
							</Card>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</MenteeLayout>
	);
}
