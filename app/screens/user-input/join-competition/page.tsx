import {
	Box,
	Grid,
	Typography,
} from "app/components/providers/mui-server-components";
import { PlayerCard } from "app/components/cards/player-card/page";
import { PlayerDropdown } from "app/components/user-input/player-dropdown/page";
import { SubmitButton } from "app/components/user-input/submit-button/page";
import { TeamDropdown } from "app/components/user-input/team-dropdown/page";
import React from "react";

export interface JoinCompetitionProps {
	competitionName: String;
	image: String;
}

export const JoinCompetition = (props: JoinCompetitionProps) => {
	return (
		<Grid
			sx={{ height: "100vh" }}
			container
			alignItems="center"
			justifyContent="center"
		>
			<Grid
				sx={{
					width: 600,
					height: 950,
					border: 1,
				}}
				container
			>
				<Grid
					container
					direction="column"
					alignItems="center"
					item
					sx={{
						width: 600,
					}}
				>
					<Box
						sx={{
							mb: 2,
							backgroundImage:
								"linear-gradient(180deg, #908EEA 0%, #BEFBE5 100%)",
							width: 250,
							height: 250,
							borderRadius: 4,
						}}
					></Box>
					<Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
						{props.competitionName || "Competition Name"}
					</Typography>
					<Grid
						container
						item
						direction="column"
						alignItems="center"
						sx={{
							width: 520,
							border: 1,
						}}
					>
						<Typography>Description:</Typography>
					</Grid>

					<Grid container direction="column"></Grid>
					<Grid
						container
						direction="column"
						sx={{ mt: 4, mb: 9, width: 480 }}
					>
						<TeamDropdown />
					</Grid>
					<SubmitButton title="Join Team" color="#818CF8" />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default JoinCompetition;
