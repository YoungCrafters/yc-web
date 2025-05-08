import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReduxProvider } from '@/components/Providers/ReduxProvider';
import { ThemeProvider } from '@/components/Providers/ThemeProvider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Young Crafter',
	description: 'A modern web application built with Next.js',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ReduxProvider>
					<ThemeProvider>{children}</ThemeProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
