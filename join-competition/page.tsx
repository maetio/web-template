import { getCompetitions } from "actions/server/competitions";
import { Grid } from "app/components/providers/mui-server-components";
import React from "react";
import { JoinCompetition } from "app/screens/user-input/join-competition/join-competition";

export const Page = async () => {
	const data = await getCompetitions();
	console.log("data from join comp team", data);
	return (
		<Grid
			sx={{ height: "100vh" }}
			container
			alignItems="center"
			justifyContent="center"
		>
			<JoinCompetition />
		</Grid>
	);
};

export default Page;
