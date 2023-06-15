import React from "react";
import { Grid } from "@mui/material";
import { PageHeader } from "../components/page-header";
import { CompetitionCard, CompetitionCardProps } from "./competition-card";
import TeamCard, { TeamCardProps } from "./team-card";
import PlayerCard, { PlayerCardProps } from "./player-card";

type ViewCompetitionProps = {
    competitions: CompetitionCardProps,
    players: PlayerCardProps,
    teams: TeamCardProps
}

const ViewCompetition = (props: ViewCompetitionProps) => {
	return (
		<Grid
			container
			direction="row"
			justifyContent="flex-start"
			spacing={2}
		>
			<Grid
				container
				item
				xs={4}
				direction="column"
				spacing={1}
			>
				<PageHeader title="Competitions"/>
				<CompetitionCard name={""} date={""} sport={{
					sportName: "",
					icon: undefined
				}}/> 
			</Grid>
			<Grid
				container
				item
				xs={4}
				spacing={1}
				direction="column"
			>
				<PageHeader title="Teams"/>
				<TeamCard name={""} location={""} position={0} score={0} change={{
					color: "",
					magnitude: 0
				}}/>
			</Grid>
			<Grid
				container
				item
				xs={4}
				spacing={1}
				direction="column"
			>
				<PageHeader title="Players"/>
				<PlayerCard name={""} position={0} score={0} change={{
					color: "",
					magnitude: 0
				}}/>
			</Grid>
		</Grid>
	);
};

export default ViewCompetition;
