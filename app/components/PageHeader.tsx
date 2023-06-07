import { Container, Grid, Typography, Divider } from '@mui/material';
import React from 'react';

export const PageHeader: React.FC<{}> = () => (
    <Grid 
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}>
        <Typography variant='overline'>Create Competition</Typography>
        <Divider></Divider>
    </Grid>
);
