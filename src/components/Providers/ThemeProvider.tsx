'use client';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#18181b',
			light: '#27272a',
			dark: '#09090b',
			contrastText: '#fafafa',
		},
		secondary: {
			main: '#f4f4f5',
			light: '#fafafa',
			dark: '#e4e4e7',
			contrastText: '#18181b',
		},
		error: {
			main: '#ef4444',
			contrastText: '#fafafa',
		},
		background: {
			default: '#ffffff',
			paper: '#ffffff',
		},
		text: {
			primary: '#09090b',
			secondary: '#71717a',
		},
	},
	shape: {
		borderRadius: 16,
	},
	typography: {
		fontFamily: [
			'Inter',
			'system-ui',
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Open Sans',
			'Helvetica Neue',
			'sans-serif',
		].join(','),
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 500,
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backdropFilter: 'blur(12px)',
					backgroundColor: 'rgba(255, 255, 255, 0.9)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
				},
			},
		},
	},
});

export function ThemeProvider({ children }: PropsWithChildren) {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
