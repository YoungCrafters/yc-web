'use client';

import { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	FormControlLabel,
	Grid,
	Stack,
	Switch,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import MenteeLayout from '@/components/Layout/MenteeLayout';
import { useAuth } from '@/hooks/useAuth';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`settings-tabpanel-${index}`}
			aria-labelledby={`settings-tab-${index}`}
			{...other}>
			{value === index && <Box sx={{ py: 3 }}>{children}</Box>}
		</div>
	);
}

export default function SettingsPage() {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState(0);
	const [notifications, setNotifications] = useState({
		email: true,
		push: true,
		sessionReminders: true,
		mentorMessages: true,
		updates: false,
	});

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	const handleNotificationChange =
		(setting: keyof typeof notifications) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setNotifications({
				...notifications,
				[setting]: event.target.checked,
			});
		};

	return (
		<MenteeLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					Settings
				</Typography>

				<Card
					elevation={0}
					sx={{ border: '1px solid', borderColor: 'divider' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={activeTab} onChange={handleTabChange}>
							<Tab label='Profile' />
							<Tab label='Notifications' />
							<Tab label='Security' />
						</Tabs>
					</Box>

					<TabPanel value={activeTab} index={0}>
						<CardContent>
							<Grid container spacing={3}>
								<Grid item xs={12} md={6}>
									<Stack spacing={3}>
										<TextField
											label='Full Name'
											defaultValue={user?.name}
											fullWidth
										/>
										<TextField
											label='Email'
											defaultValue={user?.email}
											fullWidth
											disabled
										/>
										<TextField
											label='Bio'
											multiline
											rows={4}
											fullWidth
											placeholder='Tell us about yourself...'
										/>
										<TextField
											label='LinkedIn Profile'
											fullWidth
											placeholder='https://linkedin.com/in/username'
										/>
										<TextField
											label='GitHub Profile'
											fullWidth
											placeholder='https://github.com/username'
										/>
									</Stack>
								</Grid>
							</Grid>

							<Box sx={{ mt: 3 }}>
								<Button variant='contained'>Save Changes</Button>
							</Box>
						</CardContent>
					</TabPanel>

					<TabPanel value={activeTab} index={1}>
						<CardContent>
							<Stack spacing={2} divider={<Divider />}>
								<Box>
									<Typography variant='subtitle1' gutterBottom>
										Email Notifications
									</Typography>
									<FormControlLabel
										control={
											<Switch
												checked={notifications.email}
												onChange={handleNotificationChange('email')}
											/>
										}
										label='Receive email notifications'
									/>
								</Box>

								<Box>
									<Typography variant='subtitle1' gutterBottom>
										Push Notifications
									</Typography>
									<FormControlLabel
										control={
											<Switch
												checked={notifications.push}
												onChange={handleNotificationChange('push')}
											/>
										}
										label='Enable push notifications'
									/>
								</Box>

								<Box>
									<Typography variant='subtitle1' gutterBottom>
										Session Reminders
									</Typography>
									<FormControlLabel
										control={
											<Switch
												checked={notifications.sessionReminders}
												onChange={handleNotificationChange('sessionReminders')}
											/>
										}
										label='Receive session reminders'
									/>
								</Box>

								<Box>
									<Typography variant='subtitle1' gutterBottom>
										Mentor Messages
									</Typography>
									<FormControlLabel
										control={
											<Switch
												checked={notifications.mentorMessages}
												onChange={handleNotificationChange('mentorMessages')}
											/>
										}
										label='Get notified about mentor messages'
									/>
								</Box>

								<Box>
									<Typography variant='subtitle1' gutterBottom>
										Platform Updates
									</Typography>
									<FormControlLabel
										control={
											<Switch
												checked={notifications.updates}
												onChange={handleNotificationChange('updates')}
											/>
										}
										label='Receive platform updates and newsletters'
									/>
								</Box>
							</Stack>

							<Box sx={{ mt: 3 }}>
								<Button variant='contained'>Save Preferences</Button>
							</Box>
						</CardContent>
					</TabPanel>

					<TabPanel value={activeTab} index={2}>
						<CardContent>
							<Stack spacing={3}>
								<Box>
									<Typography variant='subtitle1' gutterBottom>
										Change Password
									</Typography>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<Stack spacing={2}>
												<TextField
													type='password'
													label='Current Password'
													fullWidth
												/>
												<TextField
													type='password'
													label='New Password'
													fullWidth
												/>
												<TextField
													type='password'
													label='Confirm New Password'
													fullWidth
												/>
											</Stack>
										</Grid>
									</Grid>
									<Button variant='contained' sx={{ mt: 2 }}>
										Update Password
									</Button>
								</Box>

								<Divider />

								<Box>
									<Typography variant='subtitle1' gutterBottom>
										Two-Factor Authentication
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Add an extra layer of security to your account
									</Typography>
									<Button variant='outlined' sx={{ mt: 2 }}>
										Enable 2FA
									</Button>
								</Box>

								<Divider />

								<Box>
									<Typography variant='subtitle1' color='error' gutterBottom>
										Delete Account
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Once you delete your account, there is no going back. Please
										be certain.
									</Typography>
									<Button color='error' variant='outlined' sx={{ mt: 2 }}>
										Delete Account
									</Button>
								</Box>
							</Stack>
						</CardContent>
					</TabPanel>
				</Card>
			</Box>
		</MenteeLayout>
	);
}
