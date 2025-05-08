'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
	Home as HomeIcon,
	Search as SearchIcon,
	School as SchoolIcon,
	Assignment as TasksIcon,
	Settings as SettingsIcon,
	Person as PersonIcon,
	Message as MessageIcon,
	CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { BaseLayout } from './BaseLayout';

const menteeMenuItems = [
	{ text: 'Home', icon: <HomeIcon />, href: '/mentee/dashboard/' },
	{
		text: 'Find Mentor',
		icon: <SearchIcon />,
		href: '/mentee/dashboard/find-mentor',
	},
	{
		text: 'My Sessions',
		icon: <SchoolIcon />,
		href: '/mentee/dashboard/sessions',
	},
	{ text: 'Tasks', icon: <TasksIcon />, href: '/mentee/dashboard/tasks' },
	{
		text: 'Messages',
		icon: <MessageIcon />,
		href: '/mentee/dashboard/messages',
	},
	{
		text: 'Calendar',
		icon: <CalendarIcon />,
		href: '/mentee/dashboard/calendar',
	},
	{
		text: 'My Mentor',
		icon: <PersonIcon />,
		href: '/mentee/dashboard/mentor',
	},
];

export default function MenteeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const currentMenuItem = menteeMenuItems.find((item) =>
		pathname?.startsWith(item.href)
);

const pageTitle = currentMenuItem ? currentMenuItem.text : 'Dashboard';

	return (
		<BaseLayout
			menuItems={menteeMenuItems}
			currentPath={pathname}
			onNavigate={(path) => router.push(path)} //edited
			pageTitle={pageTitle}
		>
		{children}
		</BaseLayout>
	);
}
