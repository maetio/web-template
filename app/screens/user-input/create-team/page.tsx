"use client";

import { Cancel, Panorama } from "@mui/icons-material";
import { InputField } from "app/components/user-input/input-field/page";
import {
	Box,
	Grid,
	Typography,
} from "app/components/providers/mui-server-components";
import { PlayerCard } from "app/components/cards/player-card/page";
import { PlayerDropdown } from "app/components/user-input/player-dropdown/page";
import { SubmitButton } from "app/components/user-input/submit-button/page";
import { useForm } from "react-hook-form";

import React from "react";

export interface CreateTeamProps {
	name: string;
	image?: string;
}

export const CreateTeam: React.FC<CreateTeamProps> = ({name, image}) => {

	const { register, handleSubmit, formState: { errors } } = useForm();

	return (
		<form onSubmit={handleSubmit((data) => console.log(data))}>
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
							width: 900,
						}}
					>
						<Cancel></Cancel>
					</Grid>
					<Grid container direction="column" alignItems="center" item>
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
							<Panorama sx={{ m: 1 }}></Panorama>
							<Typography>Upload a picture</Typography>
						</Grid>
						<InputField id="teamName" register={register} label="Team Name"></InputField>
						<InputField id="teamLocation" register={register} label="Team Location"></InputField>
						<Grid
							container
							direction="column"
							sx={{ mt: 1, mb: 3, width: 480 }}
						>
							<PlayerDropdown/>
						</Grid>
						<SubmitButton
							color="#818CF8"
							title="Create Team"
						/>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

export default CreateTeam;
