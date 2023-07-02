import {
	Box,
	CalendarIcon,
	Grid,
	LocationOn,
	SportsBasketball,
	Typography,
} from "app/components/providers/mui-server-components";
import { PlayerCard } from "app/components/cards/player-card/page";
import { PlayerDropdown } from "app/components/user-input/player-dropdown/page";
import { SubmitButton } from "app/components/user-input/submit-button/page";
import { TeamDropdown } from "app/components/user-input/team-dropdown/page";
import React from "react";
import { getCompetition, getCompetitions } from "actions/server/competitions";

export interface JoinCompetitionProps {
	competitionName?: String;
	image?: String;
	description?: String;
	competitionType?: String;
	date?: String;
	location?: String;
	price?: String;
}


export /**
 * Screen where the user will join a competition of their choice; server side component, competition data is fetched asynchronously
 * 
 * @param {JoinCompetitionProps} {
 * 	competitionName,
 * 	image,
 * 	description,
 * 	competitionType,
 * 	date,
 * 	location,
 * 	price,
 * } 
 * @returns 
 */
const  JoinCompetition: React.FC<JoinCompetitionProps> = async ({
	competitionName,
	image,
	description,
	competitionType,
	date,
	location,
	price,
}) => {
	const id = "XcxEgr62pG7FfSGRD3Iv";
	const data = await getCompetition(id);
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
						{data.data()?.name}
					</Typography>
					<Grid
						container
						item
						direction="column"
						alignItems="flex-start"
						sx={{
							width: 520,
						}}
					>
						<Typography sx={{ color: "#A3A3A3" }}>
							Description: Lorem ipsum dolor sit amet, consectetur
							adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</Typography>
						<Grid container item alignItems="flex-start">
							<SportsBasketball
								sx={{ mr: 0.5, color: "#A3A3A3" }}
							></SportsBasketball>
							<Typography sx={{ color: "#A3A3A3" }}>
								{data.data()?.sport} {data.data()?.type}
							</Typography>
						</Grid>
						<Grid container item alignItems="flex-start">
							<CalendarIcon
								sx={{ mr: 0.5, color: "#A3A3A3" }}
							></CalendarIcon>
							<Typography sx={{ color: "#A3A3A3" }}>
								{data.data()?.startTimeISO}
							</Typography>
						</Grid>
						<Grid container item alignItems="flex-start">
							<LocationOn
								sx={{ mr: 0.5, color: "#A3A3A3" }}
							></LocationOn>
							<Typography sx={{ color: "#A3A3A3" }}>
								{data.data()?.location?.address}
							</Typography>
						</Grid>
						<Grid container item alignItems="flex-start">
							<Typography
								sx={{
									fontWeight: 700,
									ml: 1,
									mr: 0.5,
									color: "#A3A3A3",
								}}
							>
								{"$99" || price}
							</Typography>
							<Typography sx={{ color: "#A3A3A3" }}>
								per team
							</Typography>
						</Grid>
					</Grid>

					<Grid container direction="column"></Grid>
					<Grid
						container
						direction="column"
						sx={{ mt: 4, mb: 9, width: 480 }}
					>
						<PlayerDropdown />
					</Grid>
					<SubmitButton title="Join Competition" color="#818CF8" />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default JoinCompetition;
