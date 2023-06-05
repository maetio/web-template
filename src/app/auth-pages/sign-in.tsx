import { Button, Container, Grid } from '@mui/material';
import React from 'react';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { useRouter } from 'next/router';

export const SignIn: React.FC<{}> = () => {
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push('/enter-password');
  };
  return (
    <Grid
      container
      spacing={0}
      alignItems={'center'}
      direction={'column'}
      justifyContent={'center'}
      sx={{ minHeight: '100vh' }}
    >
      <MarkEmailUnreadIcon sx={{ fontSize: 200 }}></MarkEmailUnreadIcon>
      <Button>Open Email App</Button>
      <Button onClick={handleClick}>Use Password Instead</Button>
    </Grid>
  );
};

export default SignIn;
