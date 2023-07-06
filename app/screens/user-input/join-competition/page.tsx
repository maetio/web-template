import { getCompetitions } from "../../../../server-actions/competitions";
import { Grid } from "app/components/providers/mui-server-components";
import React from "react";
import { JoinCompetition } from "./join-competition";

export /**
 * server side rending of the join competiton screen
 *
 * @return {*}
 */
const Page = async () => {
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
