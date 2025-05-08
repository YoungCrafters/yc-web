'use client';

import { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import {
	Send as SendIcon,
	AttachFile as AttachFileIcon,
	Search as SearchIcon,
} from '@mui/icons-material';
import MenteeLayout from '@/components/Layout/MenteeLayout';

// Mock data for conversations
const mockConversations = [
	{
		id: '1',
		name: 'John Doe',
		avatar: 'https://i.pravatar.cc/150?img=1',
		lastMessage: 'Great progress on the React components!',
		timestamp: '10:30 AM',
		unread: 2,
		online: true,
	},
	{
		id: '2',
		name: 'Jane Wilson',
		avatar: 'https://i.pravatar.cc/150?img=2',
		lastMessage: "Let's schedule our next session",
		timestamp: 'Yesterday',
		unread: 0,
		online: false,
	},
];

// Mock data for messages
const mockMessages = [
	{
		id: '1',
		senderId: 'mentor',
		text: "Hi! How's your progress with the React components?",
		timestamp: '10:00 AM',
	},
	{
		id: '2',
		senderId: 'me',
		text: "Going well! I've completed the basic structure.",
		timestamp: '10:15 AM',
	},
	{
		id: '3',
		senderId: 'mentor',
		text: 'Great progress on the React components! Would you like to review them in our next session?',
		timestamp: '10:30 AM',
	},
];

export default function MessagesPage() {
	const [selectedConversation, setSelectedConversation] = useState(
		mockConversations[0]
	);
	const [newMessage, setNewMessage] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			// Add message sending logic here
			setNewMessage('');
		}
	};

	const filteredConversations = mockConversations.filter((conversation) =>
		conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<MenteeLayout>
			<Box>
				<Typography variant='h5' fontWeight='bold' gutterBottom>
					Messages
				</Typography>

				<Card
					elevation={0}
					sx={{
						height: 'calc(100vh - 180px)',
						border: '1px solid',
						borderColor: 'divider',
					}}>
					<Grid container sx={{ height: '100%' }}>
						{/* Conversations List */}
						<Grid
							item
							xs={12}
							sm={4}
							sx={{
								borderRight: '1px solid',
								borderColor: 'divider',
								height: '100%',
							}}>
							<Box sx={{ p: 2 }}>
								<TextField
									fullWidth
									size='small'
									placeholder='Search conversations...'
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
							<List sx={{ overflow: 'auto', height: 'calc(100% - 72px)' }}>
								{filteredConversations.map((conversation) => (
									<ListItem
										key={conversation.id}
										disablePadding
										secondaryAction={
											conversation.unread > 0 ? (
												<Box
													sx={{
														bgcolor: 'primary.main',
														color: 'primary.contrastText',
														borderRadius: '50%',
														width: 20,
														height: 20,
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														fontSize: '0.75rem',
														mr: 2,
													}}>
													{conversation.unread}
												</Box>
											) : null
										}>
										<ListItemButton
											selected={selectedConversation.id === conversation.id}
											onClick={() => setSelectedConversation(conversation)}>
											<ListItemAvatar>
												<Box sx={{ position: 'relative' }}>
													<Avatar src={conversation.avatar} />
													{conversation.online && (
														<Box
															sx={{
																position: 'absolute',
																bottom: 0,
																right: 0,
																width: 12,
																height: 12,
																bgcolor: 'success.main',
																border: 2,
																borderColor: 'background.paper',
																borderRadius: '50%',
															}}
														/>
													)}
												</Box>
											</ListItemAvatar>
											<ListItemText
												primary={conversation.name}
												secondary={
													<Stack
														direction='row'
														spacing={1}
														alignItems='center'>
														<Typography
															variant='body2'
															color='text.secondary'
															sx={{
																overflow: 'hidden',
																textOverflow: 'ellipsis',
																whiteSpace: 'nowrap',
															}}>
															{conversation.lastMessage}
														</Typography>
														<Typography
															variant='caption'
															color='text.secondary'>
															· {conversation.timestamp}
														</Typography>
													</Stack>
												}
											/>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</Grid>

						{/* Chat Area */}
						<Grid item xs={12} sm={8} sx={{ height: '100%' }}>
							<Box
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}>
								{/* Chat Header */}
								<Box
									sx={{
										p: 2,
										borderBottom: '1px solid',
										borderColor: 'divider',
									}}>
									<Stack direction='row' spacing={2} alignItems='center'>
										<Box sx={{ position: 'relative' }}>
											<Avatar src={selectedConversation.avatar} />
											{selectedConversation.online && (
												<Box
													sx={{
														position: 'absolute',
														bottom: 0,
														right: 0,
														width: 12,
														height: 12,
														bgcolor: 'success.main',
														border: 2,
														borderColor: 'background.paper',
														borderRadius: '50%',
													}}
												/>
											)}
										</Box>
										<Box>
											<Typography variant='subtitle1'>
												{selectedConversation.name}
											</Typography>
											<Typography variant='body2' color='text.secondary'>
												{selectedConversation.online
													? 'Online'
													: 'Last seen recently'}
											</Typography>
										</Box>
									</Stack>
								</Box>

								{/* Messages */}
								<Box
									sx={{
										flex: 1,
										overflow: 'auto',
										p: 2,
										display: 'flex',
										flexDirection: 'column',
										gap: 2,
									}}>
									{mockMessages.map((message) => (
										<Box
											key={message.id}
											sx={{
												display: 'flex',
												justifyContent:
													message.senderId === 'me' ? 'flex-end' : 'flex-start',
											}}>
											<Box
												sx={{
													maxWidth: '70%',
													bgcolor:
														message.senderId === 'me'
															? 'primary.main'
															: 'grey.100',
													color:
														message.senderId === 'me'
															? 'primary.contrastText'
															: 'text.primary',
													borderRadius: 2,
													p: 2,
												}}>
												<Typography variant='body2'>{message.text}</Typography>
												<Typography
													variant='caption'
													sx={{
														display: 'block',
														textAlign: 'right',
														mt: 0.5,
														opacity: 0.8,
													}}>
													{message.timestamp}
												</Typography>
											</Box>
										</Box>
									))}
								</Box>

								{/* Message Input */}
								<Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
									<Stack direction='row' spacing={1}>
										<IconButton size='small'>
											<AttachFileIcon />
										</IconButton>
										<TextField
											fullWidth
											size='small'
											placeholder='Type a message...'
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											onKeyPress={(e) => {
												if (e.key === 'Enter') {
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
							</Box>
						</Grid>
					</Grid>
				</Card>
			</Box>
		</MenteeLayout>
	);
}
