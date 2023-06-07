
import { Box } from '@mui/material';
import { PageHeader } from '../app/components/PageHeader';
import React from 'react';

export const CreateCompetition: React.FC<{}> = () => (
    <Box
        alignItems="center"
        sx={{ 
            height: 1, 
            width: 1,
            textAlign: 'center', }}>
        <PageHeader/>
        
    </Box>
);