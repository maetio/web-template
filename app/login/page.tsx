/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from 'app/utils/schemas';

// eslint-disable-next-line react/function-component-definition
export const EnterEmail: React.FC<{}> = () => {
  // useForm & useAuth initialization
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  // user routed to SignIn screen on click of 'continue as guest' button
  const handleGuestClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const submitEmail = async (data: any) => {
    console.log(data.email);
    /* try {
      await signUp(data.email);
      router.push('/sign-in');
      reset();
    } catch (error: any) {
      console.log(error.message);
    } */
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
        <Typography>Welcome to Maet!</Typography>
        <br />
        <TextField
          type="email"
          variant="outlined"
          label="Input your email"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('email')}
        />
        <Button type="submit">Continue</Button>
        <Button onClick={handleGuestClick}>Continue As Guest</Button>
      </Grid>
    </form>
  );
};
export default EnterEmail;
