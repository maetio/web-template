import React from "react";
import { Grid } from "app/components/mui-server-components";
import { SignIn } from "app/auth/sign-in";

/**
 * Will return the login screen
 *
 * @return {*}
 */
const Login = () => (
	<Grid
		container
		spacing={0}
		direction="column"
		alignItems="center"
		justifyContent="center"
		sx={{ minHeight: "100vh" }}
	>
		<SignIn />
	</Grid>
);

export default Login;
