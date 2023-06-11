import { Sports } from '@mui/icons-material';
import {
	Container, Grid, Typography, Divider, Box,
} from '@mui/material';
import React from 'react';

export const PageHeader: React.FC<{}> = () => (
  <Grid
    container 
    flexDirection={"row"} sx={{
    textAlign: "left",
  }}>
    <Typography color={"#4f46e5"} variant="h5" fontWeight="700">
  Create Competition
		</Typography>
    <Sports sx={{color: "#4f46e5", ml: 1, mt: 0.5}}/>
  </Grid>
	
);
