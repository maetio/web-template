"use client";

import { Cancel } from "@mui/icons-material";
import { InputField } from "app/components/input-field/page";
import {
	Box,
	FormLabel,
	Grid,
	Typography,
} from "app/components/mui-server-components";
import { PlayerCard } from "app/components/player-card/page";
import { SubmitButton } from "app/components/submit-button/page";
import React from "react";

type Props = {};

const JoinTeam = (props: Props) => {
	return (
		<Grid
			sx={{ height: "100vh", backgroundColor: "#D9D9D9" }}
			container
			alignItems="center"
			justifyContent="center"
		>

			<Grid
				sx={{
					width: 1000,
					height: 850,
					border: 1,
					borderColor: "#FAFAFA",
					borderRadius: 30,
					backgroundColor: "#FAFAFA",
				}}
				container
			>
				<Grid
					container
					direction="row"
					justifyContent="flex-end"
					alignItems="flex-end"
					sx={{
						width: 900
					}}
					
				>
					<Cancel></Cancel>
				</Grid>
				<Grid 
					container 
					direction="column" 
					alignItems="center"
					item
				>
					<Box
						sx={{
							mb: 1,
							backgroundImage:
								"linear-gradient(180deg, #908EEA 0%, #BEFBE5 100%)",
							width: 250,
							height: 250,
							borderRadius: 4,
						}}
					></Box>
					<Typography variant="h2" sx={{ fontWeight: 700 }}>
						Team Name
					</Typography>
					<Typography variant="h6">
						Contact the team captain for the team passcode
					</Typography>
					<InputField label="Enter Team Passcode"></InputField>
					<Typography>Team Roster</Typography>
					<Grid
						container
						direction="column"
						sx={{ mt: 1, mb: 3, width: 480 }}
					>
						<PlayerCard name="Player Name" score={99} />
						<PlayerCard name="Player Name" score={99} />
						<PlayerCard name="Player Name" score={99} />
					</Grid>
					<SubmitButton
						title="Join Team"
						color="#818CF8"
					></SubmitButton>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default JoinTeam;
