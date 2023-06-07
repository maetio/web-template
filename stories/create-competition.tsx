
import { Autocomplete, Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { PageHeader } from '../app/components/PageHeader';
import React from 'react';
import { purple } from '@mui/material/colors';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

export const CreateCompetition: React.FC<{}> = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box m={2}
        alignItems="center"
        flex={'row'}
        sx={{ 
            height: 1, 
            width: 1,
            textAlign: 'center',
            padding: '3px', }}>
        <PageHeader/>
        <FormControl sx={{}}>
            <Avatar sx={{ bgcolor: purple, margin: '12px', width: 50, height: 50 }} variant="square"></Avatar>
            <FormLabel>Competition Name</FormLabel>
            <TextField sx={{margin: 2}}label='Session Name'></TextField>
            <FormLabel>Sport</FormLabel>
            <Autocomplete 
            sx={{margin: 2}}
            disablePortal 
            options={options}
            renderInput={(params) => <TextField {...params} label='Select Your Sport' />}
            />
            <FormLabel>Competition Type</FormLabel>
            <RadioGroup
                defaultValue="Pickup"
                >
                    <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
                    <FormControlLabel value="Tournament" control={<Radio />} label="Tournament" />
                    <FormControlLabel value="League" control={<Radio />} label="League" />
            </RadioGroup>
            <FormLabel>Start Time</FormLabel>
            <DatePicker/>
            <TimePicker/>
            <FormLabel>End Time</FormLabel>
            <DatePicker/>
            <TimePicker/>
            <Button sx={{margin: 2}} variant='contained' type='submit'>Create Competition</Button>
        </FormControl>
        </Box>
        </LocalizationProvider>
);

const options = [
    {label: 'paddleball', id: 1}, 
    {label: 'basketball', id: 2}
];