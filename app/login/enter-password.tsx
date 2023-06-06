import React from 'react';
import {
  Button, Container, TextField, Grid, Typography, Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from 'app/utils/schemas';
import LockIcon from '@mui/icons-material/Lock';

export const EnterPassword: React.FC<{}> = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(passwordSchema) });
  // user routed to SignIn screen on click of 'return to previous screen' button
  const router = useRouter();

  const handleReturnClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push('/sign-in');
  };

  const submitPassword = (data: any) => {
    console.log(data.password);
    router.push('/settings');
  };
  return (
    <form onSubmit={handleSubmit(submitPassword)}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <LockIcon sx={{ fontSize: 200 }} />
        <Typography>Enter your password to login.</Typography>
        <br />
        <TextField variant="outlined" label="Input your password" {...register('password')} />
        <Button type="submit">Login</Button>
        <Button onClick={handleReturnClick}>Return to previous screen</Button>
      </Grid>
    </form>
  );
};
