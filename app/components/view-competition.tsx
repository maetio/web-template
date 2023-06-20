import React from "react";
import { Grid } from "@mui/material";
import {
	CompetitionCard,
	CompetitionCardProps
} from "./competition-card";
import { getCompetitions } from "../api/fetch/competitions";
import { PageHeader } from "./page-header";
import TeamCard, { TeamCardProps } from "./team-card";
import PlayerCard, { PlayerCardProps } from "./player-card";

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
				{data.docs.map((item) => (
					<CompetitionCard key={item.id} />
				))}
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
