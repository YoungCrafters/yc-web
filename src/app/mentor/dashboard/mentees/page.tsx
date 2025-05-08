'use client';

import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Stack,
	Typography,
	Avatar,
	Chip,
	Button,
	TextField,
	InputAdornment,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	LinearProgress,
} from '@mui/material';
import {
	Search as SearchIcon,
	Message as MessageIcon,
	CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import MentorLayout from '@/components/Layout/MentorLayout';
import { useRouter } from 'next/navigation';

// Mock data for mentees
const mockMentees = [
	{
		id: '1',
		name: 'Alice Smith',
		email: 'alice@example.com',
		avatar: 'https://i.pravatar.cc/150?img=1',
		progress: 75,
		learningPath: 'Frontend Development',
		skills: ['React', 'JavaScript', 'CSS'],
		nextSession: '2024-03-25T15:00:00',
		lastActive: '2 hours ago',
	},
	{
		id: '2',
		name: 'Bob Johnson',
		email: 'bob@example.com',
		avatar: 'https://i.pravatar.cc/150?img=2',
		progress: 45,
		learningPath: 'Backend Development',
		skills: ['Node.js', 'Express', 'MongoDB'],
		nextSession: '2024-03-26T16:00:00',
		lastActive: '1 day ago',
	},
	{
		id: '3',
		name: 'Carol Williams',
		email: 'carol@example.com',
		avatar: 'https://i.pravatar.cc/150?img=3',
		progress: 90,
		learningPath: 'Full Stack Development',
		skills: ['React', 'Node.js', 'TypeScript'],
		nextSession: '2024-03-27T14:00:00',
		lastActive: '3 hours ago',
	},
];

export default function MenteesPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedMentee, setSelectedMentee] = useState<
		(typeof mockMentees)[0] | null
	>(null);
	const router = useRouter();

	const filteredMentees = mockMentees.filter(
		(mentee) =>
			mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			mentee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			mentee.skills.some((skill) =>
				skill.toLowerCase().includes(searchQuery.toLowerCase())
			)
	);

	const handleCloseDialog = () => {
		setSelectedMentee(null);
	};

	const handleMessage = (menteeId: string) => {
		router.push(`/mentor/dashboard/messages?mentee=${menteeId}`);
	};

	const handleSchedule = (menteeId: string) => {
		router.push(`/mentor/dashboard/calendar?mentee=${menteeId}`);
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
						My Mentees
					</Typography>
					<TextField
						placeholder='Search mentees...'
						size='small'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
						sx={{ width: 300 }}
					/>
				</Stack>

				<Grid container spacing={3}>
					{filteredMentees.map((mentee) => (
						<Grid item xs={12} md={6} lg={4} key={mentee.id}>
							<Card>
								<CardContent>
									<Stack spacing={2}>
										<Stack direction='row' spacing={2} alignItems='center'>
											<Avatar
												src={mentee.avatar}
												alt={mentee.name}
												sx={{ width: 56, height: 56 }}
											/>
											<Box>
												<Typography variant='subtitle1' fontWeight='medium'>
													{mentee.name}
												</Typography>
												<Typography variant='body2' color='text.secondary'>
													{mentee.email}
												</Typography>
												<Typography
													variant='caption'
													color='text.secondary'
													component='div'>
													Last active: {mentee.lastActive}
												</Typography>
											</Box>
										</Stack>

										<Box>
											<Typography
												variant='body2'
												color='text.secondary'
												gutterBottom>
												Learning Progress
											</Typography>
											<Stack direction='row' spacing={1} alignItems='center'>
												<LinearProgress
													variant='determinate'
													value={mentee.progress}
													sx={{ flex: 1 }}
												/>
												<Typography variant='caption' color='text.secondary'>
													{mentee.progress}%
												</Typography>
											</Stack>
										</Box>

										<Box>
											<Typography
												variant='body2'
												color='text.secondary'
												gutterBottom>
												Learning Path
											</Typography>
											<Typography variant='body2'>
												{mentee.learningPath}
											</Typography>
										</Box>

										<Box>
											<Typography
												variant='body2'
												color='text.secondary'
												gutterBottom>
												Skills
											</Typography>
											<Stack
												direction='row'
												spacing={1}
												flexWrap='wrap'
												useFlexGap>
												{mentee.skills.map((skill) => (
													<Chip
														key={skill}
														label={skill}
														size='small'
														variant='outlined'
													/>
												))}
											</Stack>
										</Box>

										<Stack direction='row' spacing={1}>
											<Button
												startIcon={<MessageIcon />}
												variant='outlined'
												fullWidth
												onClick={() => handleMessage(mentee.id)}>
												Message
											</Button>
											<Button
												startIcon={<CalendarIcon />}
												variant='outlined'
												fullWidth
												onClick={() => handleSchedule(mentee.id)}>
												Schedule
											</Button>
										</Stack>
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>

				<Dialog
					open={!!selectedMentee}
					onClose={handleCloseDialog}
					maxWidth='sm'
					fullWidth>
					<DialogTitle>Mentee Details</DialogTitle>
					<DialogContent>
						{selectedMentee && (
							<Stack spacing={2}>
								<Stack direction='row' spacing={2} alignItems='center'>
									<Avatar
										src={selectedMentee.avatar}
										alt={selectedMentee.name}
										sx={{ width: 64, height: 64 }}
									/>
									<Box>
										<Typography variant='h6'>{selectedMentee.name}</Typography>
										<Typography color='text.secondary'>
											{selectedMentee.email}
										</Typography>
									</Box>
								</Stack>

								<Box>
									<Typography variant='subtitle2' gutterBottom>
										Learning Progress
									</Typography>
									<LinearProgress
										variant='determinate'
										value={selectedMentee.progress}
									/>
									<Typography variant='caption' color='text.secondary'>
										{selectedMentee.progress}% Complete
									</Typography>
								</Box>

								<Box>
									<Typography variant='subtitle2' gutterBottom>
										Skills
									</Typography>
									<Stack direction='row' spacing={1}>
										{selectedMentee.skills.map((skill) => (
											<Chip key={skill} label={skill} size='small' />
										))}
									</Stack>
								</Box>
							</Stack>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog}>Close</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</MentorLayout>
	);
}
