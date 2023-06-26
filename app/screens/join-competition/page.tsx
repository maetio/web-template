import { red } from "@mui/material/colors";
import { Box, Grid, Typography } from "app/components/mui-server-components";
import { PlayerCard } from "app/components/player-card/page";
import PlayerDropdown from "app/components/player-dropdown/page";
import { SubmitButton } from "app/components/submit-button/page";
import TeamDropdown from "app/components/team-dropdown/page";
import React from "react";

interface JoinCompetitionProps {
    competitionName: String;
    image: String;
}

const JoinCompetition = (props: JoinCompetitionProps) => {
	return (
		<Grid
			sx={{ height: "100vh" }}
			container
			alignItems="center"
			justifyContent="center"
		>

			<Grid
				sx={{
					width: 1100,
					height: 850,
					border: 1, 
					borderColor: red
				}}
				container
			>
				<Grid 
					container 
					direction="column" 
					alignItems="center"
					item
				>
					<Box
						sx={{
							mb: 2,
							backgroundImage: "linear-gradient(180deg, #908EEA 0%, #BEFBE5 100%)",
							width: 250,
							height: 250,
							borderRadius: 4,
						}}
					></Box>
					<Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>{props.competitionName || "Competition Name"}</Typography>
					<Typography>Description:</Typography>
					<Grid
						container
						item
						direction="column"
						alignItems="flex-start"
					>
					</Grid>
					
					<Grid
						container
						direction="column"
					>
                        
					</Grid>
					<Grid
						container
						direction="column"
						sx={{ mt: 4, mb: 9, width: 480 }}
					>
						<TeamDropdown/>
					</Grid>
					<SubmitButton
						title="Join Team"
						color="#818CF8"
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default JoinCompetition;