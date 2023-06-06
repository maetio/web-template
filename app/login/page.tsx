import React from 'react'
import { Grid } from '@mui/material';
import { EnterEmail } from 'app/login/enter-email';

export /**
 * Will return the login screen
 *
 * @return {*} 
 */
const Login: React.FC<{}> = () => {
  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: "100vh"}}>
        <EnterEmail />
    </Grid>
  )
}

export default Login;