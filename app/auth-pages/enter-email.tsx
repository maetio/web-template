import React from 'react'
import { Button, Container, TextField, Grid, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from 'app/utils/schemas';

export const EnterEmail: React.FC<{}> = () => {
  //useForm & useAuth initialization
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(emailSchema),
  });


  //user routed to SignIn screen on click of 'continue as guest' button
  const router = useRouter()
  const handleGuestClick = (e: { preventDefault: () => void; }) => {
  e.preventDefault()
  }

  const submitEmail = async (data: any) => {
    console.log(data.email)
    /*try {
      await signUp(data.email);
      router.push('/sign-in');
      reset();
    } catch (error: any) {
      console.log(error.message);
    }*/
  }
  return (
    <form onSubmit={handleSubmit(submitEmail)}>
        <Grid 
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{minHeight: "100vh"}}>
          <Paper variant="outlined"> 
          </Paper>
          <Typography>Welcome to Maet!</Typography>
          <br></br>
          <TextField type='email' variant='outlined' label='Input your email' {...register('email')}></TextField>
          <Button type='submit'>Continue</Button>
          <Button onClick={handleGuestClick}>Continue As Guest</Button>
        </Grid>
    </form>
  )
}

export default EnterEmail;