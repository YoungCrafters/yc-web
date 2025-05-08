'use client';

import { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	Stack,
	Typography,
	ButtonGroup,
	Button,
} from '@mui/material';
import {
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from 'recharts';
import MentorLayout from '@/components/Layout/MentorLayout';

// Mock data for charts
const sessionData = [
	{ month: 'Jan', sessions: 4 },
	{ month: 'Feb', sessions: 6 },
	{ month: 'Mar', sessions: 8 },
	{ month: 'Apr', sessions: 5 },
	{ month: 'May', sessions: 7 },
	{ month: 'Jun', sessions: 9 },
];

const menteeProgressData = [
	{ name: 'React', completed: 85 },
	{ name: 'Node.js', completed: 65 },
	{ name: 'TypeScript', completed: 75 },
	{ name: 'Testing', completed: 45 },
];

const feedbackData = [
	{ value: 60, name: 'Very Satisfied' },
	{ value: 25, name: 'Satisfied' },
	{ value: 10, name: 'Neutral' },
	{ value: 5, name: 'Unsatisfied' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
	const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>(
		'month'
	);

	return (
		<MentorLayout>
			<Box>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					mb={3}>
					<Typography variant='h5' fontWeight='bold'>
						Analytics
					</Typography>
					<ButtonGroup>
						<Button
							variant={timeRange === 'week' ? 'contained' : 'outlined'}
							onClick={() => setTimeRange('week')}>
							Week
						</Button>
						<Button
							variant={timeRange === 'month' ? 'contained' : 'outlined'}
							onClick={() => setTimeRange('month')}>
							Month
						</Button>
						<Button
							variant={timeRange === 'year' ? 'contained' : 'outlined'}
							onClick={() => setTimeRange('year')}>
							Year
						</Button>
					</ButtonGroup>
				</Stack>

				<Grid container spacing={3}>
					{/* Summary Cards */}
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent>
								<Typography variant='subtitle2' color='text.secondary'>
									Total Sessions
								</Typography>
								<Typography variant='h4'>39</Typography>
								<Typography variant='body2' color='success.main'>
									+12% from last month
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent>
								<Typography variant='subtitle2' color='text.secondary'>
									Active Mentees
								</Typography>
								<Typography variant='h4'>12</Typography>
								<Typography variant='body2' color='success.main'>
									+2 this month
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent>
								<Typography variant='subtitle2' color='text.secondary'>
									Average Rating
								</Typography>
								<Typography variant='h4'>4.8</Typography>
								<Typography variant='body2' color='success.main'>
									+0.2 from last month
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					{/* Session Trends */}
					<Grid item xs={12} md={8}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Session Trends
								</Typography>
								<Box sx={{ height: 300 }}>
									<ResponsiveContainer width='100%' height='100%'>
										<LineChart data={sessionData}>
											<CartesianGrid strokeDasharray='3 3' />
											<XAxis dataKey='month' />
											<YAxis />
											<Tooltip />
											<Line
												type='monotone'
												dataKey='sessions'
												stroke='#8884d8'
												strokeWidth={2}
											/>
										</LineChart>
									</ResponsiveContainer>
								</Box>
							</CardContent>
						</Card>
					</Grid>

					{/* Feedback Distribution */}
					<Grid item xs={12} md={4}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Feedback Distribution
								</Typography>
								<Box sx={{ height: 300 }}>
									<ResponsiveContainer width='100%' height='100%'>
										<PieChart>
											<Pie
												data={feedbackData}
												innerRadius={60}
												outerRadius={80}
												paddingAngle={5}
												dataKey='value'>
												{feedbackData.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={COLORS[index % COLORS.length]}
													/>
												))}
											</Pie>
											<Tooltip />
										</PieChart>
									</ResponsiveContainer>
								</Box>
							</CardContent>
						</Card>
					</Grid>

					{/* Mentee Progress */}
					<Grid item xs={12}>
						<Card>
							<CardContent>
								<Typography variant='h6' gutterBottom>
									Mentee Progress
								</Typography>
								<Box sx={{ height: 300 }}>
									<ResponsiveContainer width='100%' height='100%'>
										<BarChart data={menteeProgressData}>
											<CartesianGrid strokeDasharray='3 3' />
											<XAxis dataKey='name' />
											<YAxis />
											<Tooltip />
											<Bar
												dataKey='completed'
												fill='#8884d8'
												radius={[4, 4, 0, 0]}
											/>
										</BarChart>
									</ResponsiveContainer>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</MentorLayout>
	);
}
