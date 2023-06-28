"use client";

import { Cancel, Panorama } from "@mui/icons-material";
import { InputField } from "app/components/user-input/input-field/page";
import {
	Box,
	Button,
	Grid,
	Typography,
} from "app/components/providers/mui-server-components";
import { PlayerCard } from "app/components/cards/player-card/page";
import { PlayerDropdown } from "app/components/user-input/player-dropdown/page";
import { SubmitButton } from "app/components/user-input/submit-button/page";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateTeamSchema = yup.object().shape({
	teamName: yup.string().required("Team Name is required"),
	teamLocation: yup.string().required("Team Location is required"),
});
export interface CreateTeamProps {
	name: string;
	image?: string;
}

export /**
 * 
 * 
 * @param {CreateTeamProps} { name, image } 
 * @returns 
 */
const  CreateTeam: React.FC<CreateTeamProps> = ({ name, image }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(CreateTeamSchema) });

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
					justifyContent="flex-start"
				>
					<Grid
						container
						item
						direction="row"
						justifyContent="flex-end"
						alignItems="flex-end"
						sx={{
							width: 1000,
						}}
					>
						<Cancel></Cancel>
					</Grid>
					<Grid sx={{height: 800}} container item direction="column" alignItems="center" justifyContent="flex-start">
						<Grid
							container
							item
							direction="row"
							alignItems="center"
							justifyContent="center"
							sx={{
								mb: 3,
								backgroundColor: "#D9D9D9",
								width: 250,
								height: 250,
								borderRadius: 4,
							}}
						>
							<Button>
								<Panorama sx={{ m: 1 }}></Panorama>
								<Typography>Upload a picture</Typography>
							</Button>
							
						</Grid>
						<InputField
							id="teamName"
							register={register}
							label="Team Name"
						></InputField>
						<InputField
							id="teamLocation"
							register={register}
							label="Team Location"
						></InputField>
						<Grid
							container
							direction="column"
							sx={{ width: 480, mb: 5, ml: -2, height: 200 }}
						>
							<PlayerDropdown />
						</Grid>
						<SubmitButton color="#818CF8" title="Create Team" />
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

export default CreateTeam;
