'use client';

import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography,
	Avatar,
	Stack,
	Chip,
	Button,
	InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import MenteeLayout from '@/components/Layout/MenteeLayout';

// Mock data for mentors
const mockMentors = [
	{
		id: '1',
		name: 'John Doe',
		title: 'Senior Software Engineer',
		skills: ['JavaScript', 'React', 'Node.js'],
		rating: 4.8,
		reviews: 24,
		hourlyRate: 50,
		avatarUrl: 'https://i.pravatar.cc/150?img=1',
	},
	{
		id: '2',
		name: 'Jane Wilson',
		title: 'Full Stack Developer',
		skills: ['Python', 'Django', 'React'],
		rating: 4.9,
		reviews: 32,
		hourlyRate: 45,
		avatarUrl: 'https://i.pravatar.cc/150?img=2',
	},
	{
		id: '3',
		name: 'Mike Brown',
		title: 'Frontend Specialist',
		skills: ['Vue.js', 'CSS', 'UI/UX'],
		rating: 4.7,
		reviews: 18,
		hourlyRate: 40,
		avatarUrl: 'https://i.pravatar.cc/150?img=3',
	},
];

export default function FindMentorPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

	const filteredMentors = mockMentors.filter((mentor) => {
		const matchesSearch = mentor.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesSkills =
			selectedSkills.length === 0 ||
			mentor.skills.some((skill) => selectedSkills.includes(skill));
		return matchesSearch && matchesSkills;
	});

	return (
		<MenteeLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					Find Your Perfect Mentor
				</Typography>
				<Typography variant='body1' color='text.secondary' gutterBottom>
					Connect with experienced mentors who can guide you through your
					learning journey.
				</Typography>

				<Box sx={{ my: 4 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={8}>
							<TextField
								fullWidth
								placeholder='Search mentors by name or skills...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SearchIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
					</Grid>
				</Box>

				<Grid container spacing={3}>
					{filteredMentors.map((mentor) => (
						<Grid item xs={12} md={6} lg={4} key={mentor.id}>
							<Card
								elevation={0}
								sx={{
									border: '1px solid',
									borderColor: 'divider',
									height: '100%',
								}}>
								<CardContent>
									<Stack spacing={2}>
										<Stack direction='row' spacing={2} alignItems='center'>
											<Avatar
												src={mentor.avatarUrl}
												alt={mentor.name}
												sx={{ width: 56, height: 56 }}
											/>
											<Box>
												<Typography variant='subtitle1' fontWeight='medium'>
													{mentor.name}
												</Typography>
												<Typography variant='body2' color='text.secondary'>
													{mentor.title}
												</Typography>
											</Box>
										</Stack>

										<Stack
											direction='row'
											spacing={1}
											flexWrap='wrap'
											useFlexGap>
											{mentor.skills.map((skill) => (
												<Chip
													key={skill}
													label={skill}
													size='small'
													onClick={() =>
														setSelectedSkills((prev) =>
															prev.includes(skill)
																? prev.filter((s) => s !== skill)
																: [...prev, skill]
														)
													}
													color={
														selectedSkills.includes(skill)
															? 'primary'
															: 'default'
													}
												/>
											))}
										</Stack>

										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='center'>
											<Box>
												<Typography variant='subtitle2' color='text.secondary'>
													⭐ {mentor.rating} ({mentor.reviews} reviews)
												</Typography>
												<Typography variant='body2' color='text.secondary'>
													${mentor.hourlyRate}/hour
												</Typography>
											</Box>
											<Button variant='contained' size='small'>
												View Profile
											</Button>
										</Stack>
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
