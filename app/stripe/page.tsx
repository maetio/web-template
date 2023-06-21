import React from "react";
import { Grid } from "app/components/mui-server-components";
import CheckoutButton from "app/components/checkout-button";

const StripePage = () => {
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

export default StripePage;
