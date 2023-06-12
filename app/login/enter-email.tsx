'use client';

import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from 'app/utils/schemas';
import { useRouter } from 'next/navigation';
import { sendPasswordlessLoginEmail } from 'app/api/auth';

export const EnterEmail: React.FC<{}> = () => {
  // useForm & useAuth initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(emailSchema),
  });

  // state used to detect if email sent
  const [sentEmail, setSentEmail] = useState(false);
  // user routed to SignIn screen on click of 'continue as guest' button
  const router = useRouter();
  const handleGuestClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  const submitEmail = async (data: { email: string }) => {
    await sendPasswordlessLoginEmail(data.email);
    setSentEmail(true);
    // router.push('./sign-in');
  };

  return (
    <form onSubmit={handleSubmit(submitEmail)}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Paper variant="outlined" />
        {sentEmail
          ? (
            <Box>
              <Typography>Check your email inbox for a magic link</Typography>
              <br />
            </Box>
          )
          : (
            <Grid
              item
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography>Welcome to Maet!</Typography>
              <br />
              <TextField
                type="email"
                variant="outlined"
                label="Input your email"
                {...register('email')}
              />
              <Button type="submit">Send Magic Link</Button>
            </Grid>
          )}
      </Grid>
    </form>
  );
};
