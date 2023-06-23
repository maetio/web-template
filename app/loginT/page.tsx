import React from "react";
import { Grid } from "app/components/mui-server-components";
import { EnterEmail } from "app/loginT/enter-email";
import { useRouter } from "next/router";

export /**
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
		<EnterEmail />
	</Grid>
);

export default Login;
