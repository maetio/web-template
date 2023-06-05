import React from 'react';
import { useRouter } from 'next/router';
import { Button, Container, Typography } from '@mui/material';

export const CreateAccount: React.FC<{}> = () => {
  //user routed to ... screen on click of ... button
  const router = useRouter();
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push('/settings');
  };
  return (
    <Container sx={{ alignContent: 'center' }}>
      <Button onClick={handleClick}>Continue as Guest</Button>
      <Typography>Welcome!</Typography>
    </Container>
  );
};

export default CreateAccount;
