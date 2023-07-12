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
const GameCard: React.FC<GameCardProps> = ({ compName, team1Name, team2Name, team1Rating, team2Rating }) => {
	return (
		<div className="mt-4 grid h-48 lg:w-1/3 sm:w-1/2 grid-cols-12 justify-start gap-4 rounded-xl border p-4 align-top shadow-lg">
			<div className="col-span-3 flex-col flex items-center justify-center">
				<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue flex"></div>
				<div className="flex flex-wrap justify-center items-center">
					<text className="p-2 text-sm font-semibold">
						{team1Name}
					</text>
				</div>
				<div className="grid grid-cols-3 pl-2">
					<div className="col-span-1 flex items-center">
						<XSGrayMaetIcon />
						<text className="ml-1 text-xs text-gray-300">{team1Rating}</text>
					</div>
					<div className="col-span-2 flex items-center justify-end">
						<FaArrowTrendUp className="mr-1 text-green-800" />
						<text className="text-xs text-green-800">+99</text>
					</div>
				</div>
			</div>
			<div className="col-span-6 flex-col gap-8 items-center flex">
				<div className="flex-col flex">
					<text className="font-semibold">{compName}</text>
					<div className="flex items-center justify-center">
						<text className="text-xs text-gray-300">Jun 10, 2023</text>
					</div>
					<div className="flex-row">
						<div className="grid-cols-2 grid">
							<div className="flex col-span-1 items-center">
								<text className="font-bold"></text>
							</div>
							<div className="col-span-1 flex justify-end">
								<text> </text>
							</div>
						</div>
						<div className="bg-green-300 h-6 text-xs rounded-full flex items-center justify-center">
							<div>
								<text>Verified</text>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-3 flex-col flex items-center justify-center">
				<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue flex"></div>
				<div className="flex justify-center">
					<text className="p-2 text-sm font-semibold">
						{team2Name}
					</text>
				</div>
				<div className="grid grid-cols-3 pl-2">
					<div className="col-span-1 flex items-center">
						<XSGrayMaetIcon />
						<text className="ml-1 text-xs text-gray-300">{team2Rating}</text>
					</div>
					<div className="col-span-2 flex items-center justify-end">
						<FaArrowTrendDown className="mr-1 text-red-400" />
						<text className="text-xs text-red-400">-99</text>
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

