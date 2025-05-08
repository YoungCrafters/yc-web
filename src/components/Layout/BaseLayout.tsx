'use client';

import { useState } from 'react';
import {
	Box,
	Drawer,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Badge,
	Avatar,
	Stack,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Notifications as NotificationsIcon,
	Construction as ConstructionIcon,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';

const drawerWidth = 240;

interface MenuItem {
	text: string;
	icon: JSX.Element;
	href: string;
}

interface BaseLayoutProps {
	children: React.ReactNode;
	menuItems: MenuItem[];
	currentPath: string;
	onNavigate: (href: string) => void;
	pageTitle: string; // New prop 
}

export function BaseLayout({
	children,
	menuItems,
	currentPath,
	onNavigate,
	pageTitle, 
}: BaseLayoutProps) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { user } = useAuth();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box>
			<Box sx={{ p: 2 }}>
				<Stack direction='row' spacing={1} alignItems='center'>
					<ConstructionIcon color='primary' />
					<Typography variant='subtitle1' fontWeight='bold' noWrap>
						YoungCrafter
					</Typography>
				</Stack>
				<Typography variant='caption' color='text.secondary'>
					{user?.userType.toLowerCase()}
				</Typography>
			</Box>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton
							selected={currentPath === item.href}
							onClick={() => onNavigate(item.href)}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
					bgcolor: 'background.paper',
					borderBottom: 1,
					borderColor: 'divider',
					boxShadow: 'none',
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' sx={{ flexGrow: 1 }}>
						{pageTitle} {/* Dynamic title */}
					</Typography>
					<IconButton>
						<Badge badgeContent={4} color='error'>
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<Avatar
						sx={{ width: 32, height: 32 }}
						alt={user?.name || 'User Avatar'}
					/>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					mt: 8,
				}}>
				{children}
			</Box>
		</Box>
	);
}
