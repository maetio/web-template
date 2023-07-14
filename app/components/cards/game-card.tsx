import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { XSGrayMaetIcon } from "../icons";

// modular props for all competition cards
export interface GameCardProps {
	compName?: string;
	team1Name?: string;
	team2Name?: string;
	team1Rating?: number;
	team2Rating?: number;
	type?: string;
	date?: string;
	gameStatus?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-shadow

export /**
 * Card that renders game data upon game completion
 *
 * @param {*} {
 *		name
 *	}
 *  @return {*}
 *
 */
const GameCard: React.FC<GameCardProps> = ({
	compName,
	team1Name,
	team2Name,
	team1Rating,
	team2Rating,
	gameStatus,
}) => {
	return (
		<div className="mt-4 grid h-48 grid-cols-12 justify-start gap-4 rounded-xl border p-4 align-top shadow-lg sm:w-1/2 lg:w-1/3">
			<div className="col-span-3 flex flex-col items-center justify-center">
				<div className="flex h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
				<div className="flex flex-wrap items-center justify-center">
					<p className="p-2 text-sm font-semibold">{team1Name}</p>
				</div>
				<div className="grid grid-cols-3 pl-2">
					<div className="col-span-1 flex items-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-300">
							{team1Rating}
						</p>
					</div>
					<div className="col-span-2 flex items-center justify-end">
						<FaArrowTrendUp className="mr-1 text-green-800" />
						<p className="text-xs text-green-800">+99</p>
					</div>
				</div>
			</div>
			<div className="col-span-6 flex flex-col items-center gap-8">
				<div className="flex flex-col">
					<p className="font-semibold">{compName}</p>
					<div className="flex items-center justify-center">
						<p className="text-xs text-gray-300">Jun 10, 2023</p>
					</div>
					<div className="flex-row">
						<div className="grid grid-cols-2">
							<div className="col-span-1 flex items-center">
								<p className="font-bold"></p>
							</div>
							<div className="col-span-1 flex justify-end">
								<p> </p>
							</div>
						</div>
						<div className="flex h-6 border">
							{gameStatus ? (
								<div className="flex h-6 min-w-full items-center justify-center rounded-full bg-green-300 text-xs">
									<p>Verified</p>
								</div>
							) : (
								<div></div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-3 flex flex-col items-center justify-center">
				<div className="flex h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
				<div className="flex justify-center">
					<p className="p-2 text-sm font-semibold">{team2Name}</p>
				</div>
				<div className="grid grid-cols-3 pl-2">
					<div className="col-span-1 flex items-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-300">
							{team2Rating}
						</p>
					</div>
					<div className="col-span-2 flex items-center justify-end">
						<FaArrowTrendDown className="mr-1 text-red-400" />
						<p className="text-xs text-red-400">-99</p>
					</div>
				</div>
			</div>
		</div>
		// <Grid
		// 	container
		// 	direction="row"
		// 	justifyContent="flex-start"
		// 	alignItems="flex-start"
		// 	sx={{
		// 		backgroundColor: "#f5f5f4",
		// 		border: 1,
		// 		borderRadius: 2,
		// 		borderColor: "#f5f5f4",
		// 		display: "inline-flex",
		// 		mt: 1,
		// 		height: 100,
		// 	}}
		// >
		// 	<Grid
		// 		container
		// 		item
		// 		xs={3}
		// 		alignItems="center"
		// 		justifyContent="center"
		// 	>
		// 		<ButtonBase
		// 			sx={{
		// 				width: 70,
		// 				height: 70,
		// 				border: 1,
		// 				borderRadius: 1,
		// 				borderColor: "#f5f5f4",
		// 				backgroundColor: "purple",
		// 				m: 1,
		// 			}}
		// 		></ButtonBase>
		// 	</Grid>
		// 	<Grid
		// 		item
		// 		xs={9}
		// 		sm
		// 		container
		// 		direction="column"
		// 		alignItems="flex-start"
		// 	>
		// 		<Typography sx={{ fontWeight: 700 }}>{name}</Typography>
		// 		<Grid
		// 			item
		// 			container
		// 			xs={6}
		// 			sx={{
		// 				display: "flex",
		// 			}}
		// 		></Grid>
		// 		<Grid
		// 			item
		// 			container
		// 			direction="row"
		// 			alignItems="flex-end"
		// 			display="flex"
		// 			xs={6}
		// 		></Grid>
		// 	</Grid>
		// </Grid>
	);
};

export default GameCard;
