'use client';

import { UserType } from '@/types/auth';
import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import { Person, People } from '@mui/icons-material';

interface UserTypeToggleProps {
	value: UserType;
	onChange: (value: UserType) => void;
	className?: string;
}

export function UserTypeToggle({
	value,
	onChange,
	className,
}: UserTypeToggleProps) {
	const handleChange = (
		_: React.MouseEvent<HTMLElement>,
		newValue: UserType | null
	) => {
		if (newValue !== null) {
			onChange(newValue);
		}
	};

	return (
		<Box className={className}>
			<ToggleButtonGroup
				value={value}
				exclusive
				onChange={handleChange}
				aria-label='user type'
				fullWidth
				sx={{
					'& .MuiToggleButton-root': {
						border: '2px solid',
						borderColor: 'divider',
						borderRadius: 4,
						p: 1,
						mx: 1,
						'&.Mui-selected': {
							borderColor: 'primary.main',
							backgroundColor: 'primary.main',
							color: 'primary.contrastText',
							'&:hover': {
								backgroundColor: 'primary.dark',
							},
						},
						'&:hover': {
							borderColor: 'primary.main',
							backgroundColor: 'primary.main',
							color: 'primary.contrastText',
						},
					},
				}}>
				<ToggleButton value={UserType.MENTOR}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 1,
						}}>
						<Person sx={{ fontSize: 20 }} />
						<Typography variant='body2' fontWeight={500}>
							Mentor
						</Typography>
					</Box>
				</ToggleButton>
				<ToggleButton value={UserType.MENTEE}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 1,
						}}>
						<People sx={{ fontSize: 20 }} />
						<Typography variant='body2' fontWeight={500}>
							Mentee
						</Typography>
					</Box>
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
}
