'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SignInFormData, UserType, signInSchema } from '@/types/auth';
import { useLogin, AuthResponse } from '../app/api/services/authService';
import { useAuth } from '@/hooks/useAuth';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Stack,
	TextField,
	Typography,
	Alert,
} from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';

export default function SignInPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const message = searchParams.get('message');
	const [alertMessage, setAlertMessage] = useState<string | null>(null);

	const { signIn, isLoading, error, isAuthenticated, user } = useAuth();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	});

	useEffect(() => {
		if (message === 'check-email') {
			setAlertMessage('Please check your email for a confirmation link.');
		}
	}, [message]);

	useEffect(() => {
		if (isAuthenticated && user) {
			if (user.userType === UserType.MENTOR) {
				router.push('/mentor/dashboard');
			} else {
				router.push('/mentee/dashboard');
			}
		}
	}, [isAuthenticated, user, router]);

	const onSubmit = async (data: SignInFormData) => {
		const result: AuthResponse = await useLogin(data);
		console.log(result.user);
		if (result.user) {
			setAlertMessage(null);
			router.push('/mentor/dashboard');
			// if (user?.userType === UserType.MENTOR) {
			// 	router.push('/mentor/dashboard');
			// } else {
			// 	router.push('/mentee/dashboard');
			// }
		}
	};

	return (
		<Box
			component='main'
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				p: 2,
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(45rem 50rem at top, #f4f4f5, transparent)',
					zIndex: -1,
				},
			}}>
			<Container maxWidth='xs'>
				{alertMessage && (
					<div
						style={{
							backgroundColor: '#f0f4c3',
							color: '#33691e',
							padding: '10px',
							textAlign: 'center',
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							zIndex: 1000,
							boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
						}}>
						{alertMessage}
					</div>
				)}
				<Card
					elevation={0}
					sx={{
						backdropFilter: 'blur(12px)',
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
					}}>
					<CardHeader
						sx={{ pb: 1 }}
						title={
							<Stack spacing={1} alignItems='center'>
								<ConstructionIcon
									sx={{ fontSize: 32, color: 'primary.main' }}
								/>
								<Typography variant='h5' fontWeight='bold'>
									Young Crafter
								</Typography>
								<Typography variant='subtitle1' fontWeight='medium'>
									Welcome Back
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Sign in to continue your journey
								</Typography>
							</Stack>
						}
					/>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Stack spacing={2.5}>
								{error && (
									<Alert severity='error' variant='outlined'>
										{error}
									</Alert>
								)}

								<TextField
									fullWidth
									label='Username'
									error={!!errors.username}
									helperText={errors.username?.message}
									disabled={isLoading}
									{...register('username')}
								/>

								<TextField
									fullWidth
									label='Password'
									type='password'
									error={!!errors.password}
									helperText={errors.password?.message}
									disabled={isLoading}
									{...register('password')}
								/>

								<Button
									type='submit'
									variant='contained'
									size='large'
									disabled={isLoading}
									sx={{ py: 1.5 }}>
									{isLoading ? 'Signing in...' : 'Sign in'}
								</Button>

								<Stack spacing={2}>
									{/* <Stack
										direction='row'
										alignItems='center'
										spacing={2}
										sx={{ my: 2 }}>
										<Divider sx={{ flex: 1 }} />
										<Typography
											variant='caption'
											sx={{ px: 2, color: 'text.secondary' }}>
											Or continue with
										</Typography>
										<Divider sx={{ flex: 1 }} />
									</Stack> */}

									{/* <Stack direction='row' spacing={2}>
										<Button
											fullWidth
											variant='outlined'
											startIcon={<GoogleIcon />}
											sx={{ py: 1.5 }}>
											Google
										</Button>
										<Button
											fullWidth
											variant='outlined'
											startIcon={<GitHubIcon />}
											sx={{ py: 1.5 }}>
											GitHub
										</Button>
									</Stack> */}

									<Typography
										variant='body2'
										align='center'
										sx={{ color: 'text.secondary' }}>
										Don't have an account?{' '}
										<Link
											href='/signup'
											style={{
												color: 'black',
												fontWeight: 800,
												textDecoration: 'none',
											}}>
											Sign up
										</Link>
									</Typography>
								</Stack>
							</Stack>
						</form>
					</CardContent>
				</Card>
			</Container>
		</Box>
	);
}
