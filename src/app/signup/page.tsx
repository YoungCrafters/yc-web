'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SignUpFormData, signUpSchema } from '@/types/auth';
import { useRegister, RegistrationUserData } from '../api/services/authService';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Stack,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
// import GoogleIcon from '@mui/icons-material/Google';
// import GitHubIcon from '@mui/icons-material/Github';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function SignUpPage() {
	const router = useRouter(); // Use Next.js router
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = async (form: SignUpFormData) => {
		setIsLoading(true);
		try {
			const userData: RegistrationUserData = {
				...form,
				first_name: form.firstName,
				last_name: form.lastName,
				password1: form.password,
				password2: form.confirmPassword,
			};

			const response = await useRegister(userData);

			if (response.detail) {
				console.log('Registration successful:', response.detail);
				router.push('/?message=check-email'); // Navigate to the sign-in page
			} else {
				console.error('Registration failed:');
			}
		} catch (error) {
			console.error('Error during registration:', error);
		} finally {
			setIsLoading(false);
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
				'&::after': {
					content: '""',
					position: 'absolute',
					insetY: 0,
					right: '50%',
					width: '200%',
					transform: 'skewX(-30deg)',
					transformOrigin: 'bottom left',
					background: 'rgba(255, 255, 255, 0.8)',
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
					border: '1px solid rgba(0, 0, 0, 0.05)',
					zIndex: -1,
				},
			}}>
			<Container maxWidth='xs'>
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
									Join the Community
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Create an account to start your journey
								</Typography>
							</Stack>
						}
					/>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Stack spacing={2.5}>
								<Grid container direction='row' justifyContent='space-between'>
									<TextField
										sx={{ width: '48%' }}
										label='First Name'
										error={!!errors.firstName}
										helperText={errors.firstName?.message}
										disabled={isLoading}
										{...register('firstName')}
									/>
									<TextField
										sx={{ width: '48%' }}
										label='Last Name'
										error={!!errors.lastName}
										helperText={errors.lastName?.message}
										disabled={isLoading}
										{...register('lastName')}
									/>
								</Grid>

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
									label='Email'
									type='email'
									error={!!errors.email}
									helperText={errors.email?.message}
									disabled={isLoading}
									{...register('email')}
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

								<TextField
									fullWidth
									label='Confirm Password'
									type='password'
									error={!!errors.confirmPassword}
									helperText={errors.confirmPassword?.message}
									disabled={isLoading}
									{...register('confirmPassword')}
								/>

								<Button
									type='submit'
									variant='contained'
									size='large'
									disabled={isLoading}
									sx={{ py: 1.5 }}>
									{isLoading ? 'Creating account...' : 'Create account'}
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
										Already have an account?{' '}
										<Link
											href='/'
											style={{
												color: 'inherit',
												fontWeight: 500,
												textDecoration: 'none',
											}}>
											Sign in
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
