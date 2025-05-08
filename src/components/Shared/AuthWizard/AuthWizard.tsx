'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authWizardVariants, formFieldStyles } from './styles';
import {
	AuthStep,
	AUTH_STEPS,
	LoginFormData,
	RegisterFormData,
	AuthWizardProps,
	loginSchema,
	registerSchema,
} from './types';

export function AuthWizard({
	initialStep = AUTH_STEPS.LOGIN,
	onAuthSuccess,
	className,
}: AuthWizardProps) {
	const [currentStep, setCurrentStep] = useState<AuthStep>(initialStep);

	const {
		register: loginRegister,
		handleSubmit: handleLoginSubmit,
		formState: { errors: loginErrors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const {
		register: registerFormRegister,
		handleSubmit: handleRegisterSubmit,
		formState: { errors: registerErrors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onLogin = async (data: LoginFormData) => {
		try {
			// Handle login logic here
			console.log('Login data:', data);
			onAuthSuccess?.();
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	const onRegister = async (data: RegisterFormData) => {
		try {
			// Handle registration logic here
			console.log('Register data:', data);
			onAuthSuccess?.();
		} catch (error) {
			console.error('Register error:', error);
		}
	};

	return (
		<div className={authWizardVariants({ className })}>
			<div className='space-y-6'>
				{currentStep === AUTH_STEPS.LOGIN && (
					<form onSubmit={handleLoginSubmit(onLogin)} className='space-y-4'>
						<div>
							<label htmlFor='email' className={formFieldStyles.label}>
								Email
							</label>
							<input
								id='email'
								type='email'
								{...loginRegister('email')}
								className={formFieldStyles.input}
							/>
							{loginErrors.email && (
								<p className={formFieldStyles.error}>
									{loginErrors.email.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor='password' className={formFieldStyles.label}>
								Password
							</label>
							<input
								id='password'
								type='password'
								{...loginRegister('password')}
								className={formFieldStyles.input}
							/>
							{loginErrors.password && (
								<p className={formFieldStyles.error}>
									{loginErrors.password.message}
								</p>
							)}
						</div>

						<button type='submit' className={formFieldStyles.button}>
							Log in
						</button>

						<p className='text-center text-sm text-gray-600 dark:text-gray-400'>
							Don't have an account?{' '}
							<button
								type='button'
								onClick={() => setCurrentStep(AUTH_STEPS.REGISTER)}
								className='text-blue-600 hover:text-blue-500 dark:text-blue-400'>
								Register
							</button>
						</p>
					</form>
				)}

				{currentStep === AUTH_STEPS.REGISTER && (
					<form
						onSubmit={handleRegisterSubmit(onRegister)}
						className='space-y-4'>
						<div>
							<label htmlFor='name' className={formFieldStyles.label}>
								Name
							</label>
							<input
								id='name'
								type='text'
								{...registerFormRegister('name')}
								className={formFieldStyles.input}
							/>
							{registerErrors.name && (
								<p className={formFieldStyles.error}>
									{registerErrors.name.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor='register-email' className={formFieldStyles.label}>
								Email
							</label>
							<input
								id='register-email'
								type='email'
								{...registerFormRegister('email')}
								className={formFieldStyles.input}
							/>
							{registerErrors.email && (
								<p className={formFieldStyles.error}>
									{registerErrors.email.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='register-password'
								className={formFieldStyles.label}>
								Password
							</label>
							<input
								id='register-password'
								type='password'
								{...registerFormRegister('password')}
								className={formFieldStyles.input}
							/>
							{registerErrors.password && (
								<p className={formFieldStyles.error}>
									{registerErrors.password.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='confirm-password'
								className={formFieldStyles.label}>
								Confirm Password
							</label>
							<input
								id='confirm-password'
								type='password'
								{...registerFormRegister('confirmPassword')}
								className={formFieldStyles.input}
							/>
							{registerErrors.confirmPassword && (
								<p className={formFieldStyles.error}>
									{registerErrors.confirmPassword.message}
								</p>
							)}
						</div>

						<button type='submit' className={formFieldStyles.button}>
							Register
						</button>

						<p className='text-center text-sm text-gray-600 dark:text-gray-400'>
							Already have an account?{' '}
							<button
								type='button'
								onClick={() => setCurrentStep(AUTH_STEPS.LOGIN)}
								className='text-blue-600 hover:text-blue-500 dark:text-blue-400'>
								Log in
							</button>
						</p>
					</form>
				)}
			</div>
		</div>
	);
}
