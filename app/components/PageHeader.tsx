import { CheckBox, Sports } from '@mui/icons-material';
import {
	Grid, Typography, Divider, Box,
} from '@mui/material';
import React from 'react';

export const PageHeader: React.FC<{}> = () => (
  <Box
  justifyContent="center"
  sx={{
			display: 'inline-flex',
			textAlign: 'center',
			backgroundColor: '#4f46e5',
			border: 1,
			borderRadius: 1,
			borderColor: '#4f46e5',
		}}
	>
  <Typography
  fontFamily={['Nunito', 'sans-serif']}
  color="white"
  variant="h5"
  fontWeight="800"
		>
  Create a Competition
		</Typography>
  <Sports sx={{ color: 'white', ml: 1, mt: 0.6 }} />
	</Box>
);
