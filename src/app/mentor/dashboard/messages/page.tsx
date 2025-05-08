'use client';

import { useState } from 'react';
import {
	Box,
	Card,
	Grid,
	Stack,
	Typography,
	TextField,
	IconButton,
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemButton,
	Divider,
	Paper,
	InputAdornment,
} from '@mui/material';
import {
	Send as SendIcon,
	Search as SearchIcon,
} from '@mui/icons-material';
import MentorLayout from '@/components/Layout/MentorLayout';

// Mock data for conversations
const mockConversations = [
	{
		id: '1',
		mentee: {
			id: '1',
			name: 'Alice Smith',
			avatar: 'https://i.pravatar.cc/150?img=1',
			lastActive: 'online',
		},
		lastMessage: {
			text: 'Thank you for the help with React hooks!',
			timestamp: '2024-03-24T10:30:00',
			unread: true,
		},
	},
	{
		id: '2',
		mentee: {
			id: '2',
			name: 'Bob Johnson',
			avatar: 'https://i.pravatar.cc/150?img=2',
			lastActive: '2 hours ago',
		},
		lastMessage: {
			text: 'When is our next session?',
			timestamp: '2024-03-24T09:15:00',
			unread: false,
		},
	},
	{
		id: '3',
		mentee: {
			id: '3',
			name: 'Carol Williams',
			avatar: 'https://i.pravatar.cc/150?img=3',
			lastActive: '1 day ago',
		},
		lastMessage: {
			text: 'I completed the TypeScript assignment',
			timestamp: '2024-03-23T15:45:00',
			unread: true,
		},
	},
];

// Mock messages for a conversation
const mockMessages = [
	{
		id: '1',
		senderId: 'mentor',
		text: 'How are you progressing with the React assignment?',
		timestamp: '2024-03-24T10:00:00',
	},
	{
		id: '2',
		senderId: 'mentee',
		text: 'I've completed most of it, but I'm having trouble with hooks.',
		timestamp: '2024-03-24T10:15:00',
	},
	{
		id: '3',
		senderId: 'mentor',
		text: 'Let me explain how useEffect works with dependencies.',
		timestamp: '2024-03-24T10:20:00',
	},
	{
		id: '4',
		senderId: 'mentee',
		text: 'Thank you for the help with React hooks!',
		timestamp: '2024-03-24T10:30:00',
	},
];

export default function MessagesPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedConversation, setSelectedConversation] = useState(
		mockConversations[0]
	);
	const [newMessage, setNewMessage] = useState('');

	const filteredConversations = mockConversations.filter((conversation) =>
		conversation.mentee.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	const handleSendMessage = () => {
		if (!newMessage.trim()) return;
		// In a real app, this would send the message to the backend
		console.log('Sending message:', newMessage);
		setNewMessage('');
	};

	const formatTime = (timestamp: string) => {
		return new Date(timestamp).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});
	};

	return (
		<MentorLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					Messages
				</Typography>

				<Card sx={{ height: 'calc(100vh - 180px)' }}>
					<Grid container sx={{ height: '100%' }}>
						{/* Conversations List */}
						<Grid
							item
							xs={12}
							md={4}
							sx={{
								borderRight: 1,
								borderColor: 'divider',
								height: '100%',
							}}>
							<Stack sx={{ height: '100%' }}>
								<Box sx={{ p: 2 }}>
									<TextField
										fullWidth
										size='small'
										placeholder='Search mentees...'
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
								</Box>
								<Divider />
								<List sx={{ flex: 1, overflow: 'auto' }}>
									{filteredConversations.map((conversation) => (
										<ListItem
											key={conversation.id}
											disablePadding
											secondaryAction={
												conversation.lastMessage.unread && (
													<Box
														sx={{
															width: 8,
															height: 8,
															bgcolor: 'primary.main',
															borderRadius: '50%',
															mr: 2,
														}}
													/>
												)
											}>
											<ListItemButton
												selected={
													selectedConversation.id === conversation.id
												}
												onClick={() => setSelectedConversation(conversation)}>
												<ListItemAvatar>
													<Avatar
														src={conversation.mentee.avatar}
														alt={conversation.mentee.name}
													/>
												</ListItemAvatar>
												<ListItemText
													primary={conversation.mentee.name}
													secondary={conversation.lastMessage.text}
													primaryTypographyProps={{
														fontWeight:
															conversation.lastMessage.unread ? 'bold' : 'normal',
													}}
													secondaryTypographyProps={{
														noWrap: true,
													}}
												/>
											</ListItemButton>
										</ListItem>
									))}
								</List>
							</Stack>
						</Grid>

						{/* Chat Area */}
						<Grid item xs={12} md={8}>
							<Stack sx={{ height: '100%' }}>
								{/* Chat Header */}
								<Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
									<Stack direction='row' spacing={2} alignItems='center'>
										<Avatar
											src={selectedConversation.mentee.avatar}
											alt={selectedConversation.mentee.name}
										/>
										<Box>
											<Typography variant='subtitle1'>
												{selectedConversation.mentee.name}
											</Typography>
											<Typography
												variant='body2'
												color='text.secondary'>
												{selectedConversation.mentee.lastActive}
											</Typography>
										</Box>
									</Stack>
								</Box>

								{/* Messages */}
								<Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
									<Stack spacing={2}>
										{mockMessages.map((message) => (
											<Box
												key={message.id}
												sx={{
													display: 'flex',
													justifyContent:
														message.senderId === 'mentor'
															? 'flex-end'
															: 'flex-start',
												}}>
												<Paper
													sx={{
														p: 2,
														maxWidth: '70%',
														bgcolor:
															message.senderId === 'mentor'
																? 'primary.main'
																: 'grey.100',
														color:
															message.senderId === 'mentor'
																? 'primary.contrastText'
																: 'text.primary',
													}}>
													<Typography variant='body1'>
														{message.text}
													</Typography>
													<Typography
														variant='caption'
														color={
															message.senderId === 'mentor'
																? 'primary.contrastText'
																: 'text.secondary'
														}>
														{formatTime(message.timestamp)}
													</Typography>
												</Paper>
											</Box>
										))}
									</Stack>
								</Box>

								{/* Message Input */}
								<Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
									<Stack direction='row' spacing={1}>
										<TextField
											fullWidth
											size='small'
											placeholder='Type a message...'
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											onKeyPress={(e) => {
												if (e.key === 'Enter' && !e.shiftKey) {
													e.preventDefault();
													handleSendMessage();
												}
											}}
										/>
										<IconButton
											color='primary'
											onClick={handleSendMessage}
											disabled={!newMessage.trim()}>
											<SendIcon />
										</IconButton>
									</Stack>
								</Box>
							</Stack>
						</Grid>
					</Grid>
				</Card>
			</Box>
		</MentorLayout>
	);
} 