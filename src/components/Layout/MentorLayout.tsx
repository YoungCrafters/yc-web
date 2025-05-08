'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
	Home as HomeIcon,
	Analytics as AnalyticsIcon,
	People as PeopleIcon,
	Assignment as TasksIcon,
	Settings as SettingsIcon,
	School as SchoolIcon,
} from '@mui/icons-material';
import { BaseLayout } from './BaseLayout';

const mentorMenuItems = [
	{ text: 'Home', icon: <HomeIcon />, href: '/mentor/dashboard' },
	{
		text: 'Analytics',
		icon: <AnalyticsIcon />,
		href: '/mentor/dashboard/analytics',
	},
	{
		text: 'My Mentees',
		icon: <PeopleIcon />,
		href: '/mentor/dashboard/mentees',
	},
	{ text: 'Tasks', icon: <TasksIcon />, href: '/mentor/dashboard/tasks' },
	{
		text: 'Sessions',
		icon: <SchoolIcon />,
		href: '/mentor/dashboard/sessions',
	},
];

export default function MentorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const currentMenuItem = mentorMenuItems.find((item) =>
		pathname?.startsWith(item.href)
);

const pageTitle = currentMenuItem ? currentMenuItem.text: 'Dashboard';

	return (
		<BaseLayout
			menuItems={mentorMenuItems}
			currentPath={pathname}
			onNavigate={router.push}
			pageTitle={pageTitle}
			>
			{children}
		</BaseLayout>
	);
}
