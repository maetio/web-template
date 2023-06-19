import React, { useEffect } from "react";
import { Grid } from "app/components/mui-server-components";
import { signInWithLink } from "app/api/auth";
import { useRecoilValue } from "recoil";
import { UserState } from "app/recoil-store";
import { CheckoutButton } from "app/components/checkout-button";

const Home = () => {
	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: "100vh" }}
		>
			<CheckoutButton />
		</Grid>
	);
};

export default Home;
