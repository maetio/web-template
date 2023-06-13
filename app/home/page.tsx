import React from 'react';
import { Grid, Typography } from 'app/components/mui-server-components';

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const Home = () => (
  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}
  >
    <Typography>You are logged in.</Typography>
  </Grid>
);

export default Home;
