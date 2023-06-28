import React from "react";
import { Grid } from "@mui/material";
import { PageHeader } from "app/components/layout";
import { getCompetitions } from "actions/server/competitions";
import {
	CompetitionCardProps,
	PlayerCardProps,
	TeamCardProps,
} from "app/components/cards";

type ViewCompetitionProps = {
	competitions: CompetitionCardProps;
	players: PlayerCardProps;
	teams: TeamCardProps;
};

export /**
 * Screen of CompetitionCards, PlayerCards, and TeamCards
 *
 * @param {*} {
 *		ViewCompetitionProps
 *	}
 *  @return {*}
 *
 */
const ViewCompetition = async (props: ViewCompetitionProps) => {
	const data = await getCompetitions();
	return (
		<Grid container direction="row" justifyContent="flex-start" spacing={2}>
			<Grid container item xs={4} direction="column" spacing={1}>
				<PageHeader title="Competitions" />
			</Grid>
			<Grid container item xs={4} spacing={1} direction="column">
				<PageHeader title="Teams" />
			</Grid>
			<Grid container item xs={4} spacing={1} direction="column">
				<PageHeader title="Players" />
			</Grid>
		</Grid>
	);
};

export default ViewCompetition;
