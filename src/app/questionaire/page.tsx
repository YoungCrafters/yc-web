'use client';

import { useState } from 'react';
import {
	Button,
	Box,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
	questions,
	Answers,
	AddressAnswer,
	states,
	AnswerValue,
} from './types';

const Questionnaire = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<Answers>({});
	const currentQuestion = questions[currentQuestionIndex];
	const isFirstQuestion = currentQuestionIndex === 0;
	const isLastQuestion = currentQuestionIndex === questions.length - 1;

	const handleAnswerChange = (value: AnswerValue) => {
		setAnswers(
			(prev): Answers => ({
				...prev,
				[currentQuestion.id]: value,
			})
		);
	};

	const handleAddressChange = (field: keyof AddressAnswer, value: string) => {
		setAnswers((prev: Answers) => {
			const currentAddress = (prev[currentQuestion.id] as AddressAnswer) || {
				street: '',
				city: '',
				state: '',
				zipCode: '',
			};
			return {
				...prev,
				[currentQuestion.id]: {
					...currentAddress,
					[field]: value,
				},
			};
		});
	};

	const isQuestionAnswered = () => {
		const answer = answers[currentQuestion.id];
		if (!answer) return false;

		if (currentQuestion.type === 'address') {
			// Check if all address fields are filled
			if (typeof answer !== 'object') return false;
			const addr = answer as AddressAnswer;
			return addr.street && addr.city && addr.state && addr.zipCode;
		}

		return !!answer;
	};

	const handleNext = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		}
	};

	const handleSubmit = async () => {
		try {
			// Replace with your actual API endpoint
			const response = await fetch('/api/submit-questionnaire', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(answers),
			});

			if (!response.ok) {
				throw new Error('Failed to submit questionnaire');
			}

			// Handle successful submission (e.g., redirect to dashboard)
			console.log('Questionnaire submitted successfully!');
		} catch (error) {
			console.error('Error submitting questionnaire:', error);
		}
	};

	// Render the question input based on the question type
	const renderQuestionInput = () => {
		switch (currentQuestion.type) {
			case 'multiple-choice':
				return (
					<RadioGroup
						value={answers[currentQuestion.id] || ''}
						onChange={(e) => handleAnswerChange(e.target.value)}>
						{currentQuestion.options?.map((option) => (
							<FormControlLabel
								key={option}
								value={option}
								control={<Radio />}
								label={option}
							/>
						))}
					</RadioGroup>
				);

			case 'date':
				return (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label='Date of Birth'
							value={(answers[currentQuestion.id] as Date) || null}
							onChange={(newValue) => handleAnswerChange(newValue as Date)}

							maxDate={new Date()}
							slotProps={{
								textField: {
									fullWidth: true,
								},
							}}
						/>
					</LocalizationProvider>
				);

			case 'address':
				const address = (answers[currentQuestion.id] as AddressAnswer) || {
					street: '',
					city: '',
					state: '',
					zipCode: '',
				};
				return (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
						<TextField
							label='Street Address'
							value={address.street}
							onChange={(e) => handleAddressChange('street', e.target.value)}
							fullWidth
						/>
						<Box sx={{ display: 'flex', gap: 2 }}>
							<TextField
								label='City'
								value={address.city}
								onChange={(e) => handleAddressChange('city', e.target.value)}
								sx={{ flex: 2 }}
							/>
							<FormControl sx={{ flex: 1 }}>
								<InputLabel>State</InputLabel>
								<Select
									value={address.state}
									label='State'
									onChange={(e) =>
										handleAddressChange('state', e.target.value)
									}>
									{states.map((state) => (
										<MenuItem key={state} value={state}>
											{state}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField
								label='ZIP Code'
								value={address.zipCode}
								onChange={(e) => handleAddressChange('zipCode', e.target.value)}
								sx={{ flex: 1 }}
								inputProps={{ pattern: '\\d{5}(-\\d{4})?' }}
							/>
						</Box>
					</Box>
				);

			case 'text':
			default:
				return (
					<TextField
						fullWidth
						multiline
						rows={4}
						variant='outlined'
						value={answers[currentQuestion.id] || ''}
						onChange={(e) => handleAnswerChange(e.target.value)}
					/>
				);
		}
	};

	return (
		<Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
			<Typography variant='h5' gutterBottom>
				Questionnaire
			</Typography>

			<Typography variant='subtitle1' gutterBottom>
				Question {currentQuestionIndex + 1} of {questions.length}
			</Typography>

			<Typography variant='h6' gutterBottom>
				{currentQuestion.text}
			</Typography>

			{renderQuestionInput()}

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
				<Button
					variant='outlined'
					onClick={handleBack}
					disabled={isFirstQuestion}>
					Back
				</Button>

				{!isLastQuestion ? (
					<Button
						variant='contained'
						onClick={handleNext}
						disabled={!isQuestionAnswered()}>
						Next
					</Button>
				) : (
					<Button
						variant='contained'
						color='success'
						onClick={handleSubmit}
						disabled={!isQuestionAnswered()}>
						Submit
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default Questionnaire;
