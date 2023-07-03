"use client";

import {
	Box,
	Grid,
	Typography,
} from "app/components/providers/mui-server-components";
import { PlayerDropdown } from "app/components/user-input/player-dropdown/page";
import { SubmitButton } from "app/components/user-input/submit-button/page";
import React from "react";
import { LocationOn, SportsBasketball } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { AlgoliaSearchComp } from "app/components/user-input/algolia-search";

export interface JoinCompetitionProps {
	competitionName?: string;
	image?: string;
	description?: string;
	competitionType?: string;
	date?: string;
	location?: string;
	price?: number;
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
const JoinCompetition: React.FC<JoinCompetitionProps> = ({
	competitionName,
	image,
	description,
	competitionType,
	date,
	location,
	price,
}) => {
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
					{/* linear gradient example */}
					{/* <Box
						sx={{
							mb: 2,
							backgroundImage:
								"linear-gradient(180deg, #908EEA 0%, #BEFBE5 100%)",
							width: 250,
							height: 250,
							borderRadius: 4,
						}}
					/> */}
					{/* image example */}
					<img
						src={image || ""}
						alt="Girl in a jacket"
						width="250"
						height="250"
					/>
					<Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
						{competitionName}
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
							{description}
						</Typography>
						<Grid container item alignItems="flex-start">
							<SportsBasketball
								sx={{ mr: 0.5, color: "#A3A3A3" }}
							></SportsBasketball>
							<Typography sx={{ color: "#A3A3A3" }}>
								{competitionType}
							</Typography>
						</Grid>
						<Grid container item alignItems="flex-start">
							<CalendarIcon
								sx={{ mr: 0.5, color: "#A3A3A3" }}
							></CalendarIcon>
							<Typography sx={{ color: "#A3A3A3" }}>
								{date}
							</Typography>
						</Grid>
						<Grid container item alignItems="flex-start">
							<LocationOn
								sx={{ mr: 0.5, color: "#A3A3A3" }}
							></LocationOn>
							<Typography sx={{ color: "#A3A3A3" }}>
								{location}
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
								${price}
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
						<AlgoliaSearchComp algoliaIndex="profiles" />
						<AlgoliaSearchComp algoliaIndex="teams" />
					</Grid>
					<SubmitButton title="Join Competition" color="#818CF8" />
				</Grid>
			</Grid>
		</Grid>
	);
};

JoinCompetition.defaultProps = {
	competitionName: "example name",
	image: "https://www.investopedia.com/thmb/ckPwC5ARwco1nOSCKVGE57se8MI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1245748917-99e3329a7b8147e8ab648806220ce153.jpg",
	description:
		"Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	competitionType: "Basketball Tournament",
	date: "June 27 at 12:00 PM",
	location: "1234 Neighborhood St, City, IN",
	price: 5,
};
