import React from "react";
import { Grid } from "@mui/material";
import { TeamCardProps } from "./cards/team-card/page";
import { CompetitionCard, CompetitionCardProps } from "./cards/competition-card/page";
import { getCompetitions } from "../api/server/competitions";
import { PageHeader } from "./page-header";
import { PlayerCard, PlayerCardProps } from "./cards/player-card/page";

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
