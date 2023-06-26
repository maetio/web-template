"use client";

import { Cancel, Panorama } from "@mui/icons-material";
import { InputField } from "app/components/user-input/input-field/page";
import { Box, Grid, Typography } from "app/components/mui-server-components";
import { PlayerCard } from "app/components/cards/player-card/page";
import PlayerDropdown from "app/components/user-input/player-dropdown/page";
import { SubmitButton } from "app/components/user-input/submit-button/page";
import React from "react";

export interface CreateTeamProps {
    name: string,
    image?: string
}

const CreateTeam = (props: CreateTeamProps) => {
	return (
		<Grid
			sx={{ height: "100vh", backgroundColor: "#D9D9D9" }}
			container
			alignItems="center"
			justifyContent="center"
		>

			<Grid
				sx={{
					width: 1100,
					height: 850,
					border: 1,
					borderColor: "#FAFAFA",
					borderRadius: 30,
					backgroundColor: "#FAFAFA",
				}}
				container
				alignItems="center"
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
					<Grid
						container
						direction="row"
						alignItems="center"
						justifyContent="center"
						sx={{
							mb: 1,
							backgroundColor: "#D9D9D9",
							width: 250,
							height: 250,
							borderRadius: 4,
						}}
					>
						<Panorama sx={{m: 1}}></Panorama>
						<Typography>Upload a picture</Typography>
					</Grid>
					<InputField label="Team Name"></InputField>
					<InputField label="Team Location"></InputField>
					<Grid
						container
						direction="column"
						sx={{ mt: 1, mb: 3, width: 480 }}
					>
						<PlayerDropdown/>
					</Grid>
					<SubmitButton
						title="Create Team"
						color="#818CF8"
					></SubmitButton>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CreateTeam;