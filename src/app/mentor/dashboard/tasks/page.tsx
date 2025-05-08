'use client';

import { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import {
	Add as AddIcon,
	Search as SearchIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
} from '@mui/icons-material';
import MentorLayout from '@/components/Layout/MentorLayout';
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
	assignedTo?: string;
}

// Mock data
const mockTasks: Task[] = [
	{
		id: '1',
		title: 'Review JavaScript Basics',
		description: 'Go through fundamental JavaScript concepts with mentee',
		status: 'todo',
		priority: 'high',
		dueDate: '2024-03-25',
		assignedTo: 'Alice Smith',
	},
	{
		id: '2',
		title: 'Prepare React Workshop',
		description: 'Create materials for upcoming React workshop',
		status: 'in_progress',
		priority: 'medium',
		dueDate: '2024-03-28',
		assignedTo: 'Bob Johnson',
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
	const [tasks, setTasks] = useState<Task[]>(mockTasks);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
	const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>(
		'all'
	);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	useEffect(() => {
		// Redirect if user is not logged in or is not a mentor
		if (!user) {
			router.push('/');
		} else if (user.userType !== UserType.MENTOR) {
			router.push('/mentee/dashboard');
		}
	}, [user, router]);

	if (!user || user.userType !== UserType.MENTOR) {
		return null; // or a loading spinner
	}

	const handleOpenDialog = (task?: Task) => {
		if (task) {
			setSelectedTask(task);
		} else {
			setSelectedTask(null);
		}
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setSelectedTask(null);
	};

	const handleSaveTask = (event: React.FormEvent) => {
		event.preventDefault();
		// TODO: Implement task saving logic
		handleCloseDialog();
	};

	const handleDeleteTask = (taskId: string) => {
		setTasks(tasks.filter((task) => task.id !== taskId));
	};

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
		<MentorLayout>
			<Box>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					mb={3}>
					<Typography variant='h5' fontWeight='bold'>
						Tasks
					</Typography>
					<Button
						variant='contained'
						startIcon={<AddIcon />}
						onClick={() => handleOpenDialog()}>
						Add Task
					</Button>
				</Stack>

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
										<Stack
											direction='row'
											justifyContent='space-between'
											alignItems='flex-start'>
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
											<Stack direction='row' spacing={1}>
												<IconButton
													size='small'
													onClick={() => handleOpenDialog(task)}>
													<EditIcon />
												</IconButton>
												<IconButton
													size='small'
													onClick={() => handleDeleteTask(task.id)}>
													<DeleteIcon />
												</IconButton>
											</Stack>
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

										{task.assignedTo && (
											<Typography variant='body2' color='text.secondary'>
												Assigned to: {task.assignedTo}
											</Typography>
										)}
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>

				<Dialog
					open={dialogOpen}
					onClose={handleCloseDialog}
					maxWidth='sm'
					fullWidth>
					<DialogTitle>
						{selectedTask ? 'Edit Task' : 'Create New Task'}
					</DialogTitle>
					<DialogContent>
						<Stack spacing={2} sx={{ mt: 1 }}>
							<TextField
								fullWidth
								label='Title'
								defaultValue={selectedTask?.title}
							/>
							<TextField
								fullWidth
								label='Description'
								multiline
								rows={3}
								defaultValue={selectedTask?.description}
							/>
							<FormControl fullWidth>
								<InputLabel>Status</InputLabel>
								<Select
									label='Status'
									defaultValue={selectedTask?.status || 'todo'}>
									<MenuItem value='todo'>To Do</MenuItem>
									<MenuItem value='in_progress'>In Progress</MenuItem>
									<MenuItem value='completed'>Completed</MenuItem>
								</Select>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel>Priority</InputLabel>
								<Select
									label='Priority'
									defaultValue={selectedTask?.priority || 'medium'}>
									<MenuItem value='low'>Low</MenuItem>
									<MenuItem value='medium'>Medium</MenuItem>
									<MenuItem value='high'>High</MenuItem>
								</Select>
							</FormControl>
							<TextField
								fullWidth
								label='Due Date'
								type='date'
								defaultValue={selectedTask?.dueDate}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								fullWidth
								label='Assign To'
								defaultValue={selectedTask?.assignedTo}
							/>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog}>Cancel</Button>
						<Button variant='contained' onClick={handleSaveTask}>
							{selectedTask ? 'Save Changes' : 'Create Task'}
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</MentorLayout>
	);
}
