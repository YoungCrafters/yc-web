'use client';

import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Chip,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import MenteeLayout from '@/components/Layout/MenteeLayout';
import { useAuth } from '@/hooks/useAuth';
import { UserType } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type TaskPriority = 'low' | 'medium' | 'high';
type TaskStatus = 'todo' | 'in_progress' | 'completed';

interface Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	priority: TaskPriority;
	dueDate: string;
	assignedBy?: string;
}

// Mock data
const mockTasks: Task[] = [
	{
		id: '1',
		title: 'Complete JavaScript Basics',
		description: 'Review and practice fundamental JavaScript concepts',
		status: 'todo',
		priority: 'high',
		dueDate: '2024-03-25',
		assignedBy: 'John Doe',
	},
	{
		id: '2',
		title: 'React Components Exercise',
		description: 'Build three reusable React components',
		status: 'in_progress',
		priority: 'medium',
		dueDate: '2024-03-28',
		assignedBy: 'Jane Wilson',
	},
];

const priorityColors: Record<TaskPriority, 'success' | 'warning' | 'error'> = {
	low: 'success',
	medium: 'warning',
	high: 'error',
};

const statusIcons: Record<TaskStatus, string> = {
	todo: '🔵',
	in_progress: '🟡',
	completed: '🟢',
};

export default function TasksPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [tasks] = useState<Task[]>(mockTasks);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
	const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>(
		'all'
	);

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

	const filteredTasks = tasks.filter((task) => {
		const matchesSearch = task.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatus =
			statusFilter === 'all' || task.status === statusFilter;
		const matchesPriority =
			priorityFilter === 'all' || task.priority === priorityFilter;
		return matchesSearch && matchesStatus && matchesPriority;
	});

	return (
		<MenteeLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					My Tasks
				</Typography>

				<Grid container spacing={2} mb={3}>
					<Grid item xs={12} md={4}>
						<TextField
							fullWidth
							placeholder='Search tasks...'
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
					<Grid item xs={6} md={4}>
						<FormControl fullWidth>
							<InputLabel>Status</InputLabel>
							<Select
								value={statusFilter}
								label='Status'
								onChange={(e) =>
									setStatusFilter(e.target.value as TaskStatus | 'all')
								}>
								<MenuItem value='all'>All</MenuItem>
								<MenuItem value='todo'>To Do</MenuItem>
								<MenuItem value='in_progress'>In Progress</MenuItem>
								<MenuItem value='completed'>Completed</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={4}>
						<FormControl fullWidth>
							<InputLabel>Priority</InputLabel>
							<Select
								value={priorityFilter}
								label='Priority'
								onChange={(e) =>
									setPriorityFilter(e.target.value as TaskPriority | 'all')
								}>
								<MenuItem value='all'>All</MenuItem>
								<MenuItem value='low'>Low</MenuItem>
								<MenuItem value='medium'>Medium</MenuItem>
								<MenuItem value='high'>High</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					{filteredTasks.map((task) => (
						<Grid item xs={12} md={6} key={task.id}>
							<Card>
								<CardContent>
									<Stack spacing={2}>
										<Stack spacing={1}>
											<Typography variant='subtitle1' fontWeight='medium'>
												{task.title}
											</Typography>
											<Typography
												variant='body2'
												color='text.secondary'
												sx={{
													display: '-webkit-box',
													WebkitLineClamp: 2,
													WebkitBoxOrient: 'vertical',
													overflow: 'hidden',
												}}>
												{task.description}
											</Typography>
										</Stack>

										<Stack
											direction='row'
											spacing={1}
											alignItems='center'
											flexWrap='wrap'
											useFlexGap>
											<Chip
												size='small'
												color={priorityColors[task.priority]}
												label={`${task.priority} priority`}
											/>
											<Chip
												size='small'
												variant='outlined'
												icon={
													<Typography component='span'>
														{statusIcons[task.status]}
													</Typography>
												}
												label={task.status.replace('_', ' ')}
											/>
											<Typography
												variant='caption'
												color='text.secondary'
												sx={{ ml: 'auto !important' }}>
												Due: {new Date(task.dueDate).toLocaleDateString()}
											</Typography>
										</Stack>

										{task.assignedBy && (
											<Typography variant='body2' color='text.secondary'>
												Assigned by: {task.assignedBy}
											</Typography>
										)}
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
