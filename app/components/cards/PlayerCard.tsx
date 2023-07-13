import React from "react";
import { FaMedal } from "react-icons/fa6";
import { XSMaetIcon } from "../icons/maet-icon";

export interface PlayerCardProps {
	name?: string;
	image?: string | null | undefined;
	score?: number;
	ranking?: number;
}


export /**
 * Card that renders the initial player data
 *
 * @param {*} {
 *		PlayerCardProps
 *	}
 *  @return {*}
 *
 */
const PlayerCard: React.FC<PlayerCardProps> = ({ name, score, ranking, image }) => {
	// define medal colors
	const medalColor: string[] = ["text-yellow-400", "text-gray-400", "text-amber-700"];
	return (
		<div className="grid h-12 w-5/6 grid-cols-12 items-center justify-start gap-4 border-b">
			{ranking && (
				<div className="col-span-2 md:col-span-1 flex items-center">
					{
						ranking <= 3 && (
							<FaMedal className={`ml-1 ${medalColor[ranking - 1]} md:text-base`} />
						)
					}
					<p className="ml-1 font-bold">
						{ranking}
					</p>
				</div>
			)}
			<div className="col-span-2 flex items-center gap-1">
				<div style={{
					backgroundImage: image ? `url(${image})` : "bg-none"
				}} className="h-4 w-4 md:h-8 md:w-8 rounded-full bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
			</div>
			<div className="col-span-4 flex items-start">
				<p className="text-xs lg:text-base font-bold">{name}</p>
			</div>
			<div className="col-span-4 flex items-center justify-start md:justify-end gap-1 md:gap-2">
				<XSMaetIcon />
				<p className="text-xs lg:text-base font-bold">{score}</p>
				{/* <div>
						<FaArrowTrendUp className="text-xs text-green-800" />
					</div>
					<p className="text-xs lg:text-base font-bold text-green-800">
						+99
					</p> */}
			</div>
		</div>
		// <Grid
		// 	container
		// 	direction="row"
		// 	justifyContent="flex-start"
		// 	alignItems="center"
		// 	sx={{
		// 		borderBottom: 1,
		// 		borderColor: "#E5E5E5",
		// 		display: "inline-flex",
		// 		mt: 1,
		// 		height: 60,
		// 		width: 480,
		// 	}}
		// >
		// 	<Grid item container xs={6} alignItems="center">
		// 		<Box
		// 			sx={{
		// 				ml: 2,
		// 				backgroundImage:
		// 					image ||
		// 					"linear-gradient(207deg, #EAE68E 13.76%, #FBBEBE 60.61%, #BEE1FB 100%);",
		// 				borderRadius: "50%",
		// 				width: 40,
		// 				height: 41,
		// 			}}
		// 		></Box>
		// 		<Typography sx={{ fontWeight: 700, ml: 2 }}>{name}</Typography>
		// 	</Grid>
		// 	<Grid
		// 		item
		// 		container
		// 		xs={6}
		// 		direction="row"
		// 		alignItems="flex-end"
		// 		justifyContent="flex-end"
		// 	>
		// 		<MaetIcon sx={{ mr: 1 }}></MaetIcon>
		// 		<Typography sx={{ fontWeight: 300, mr: 4 }}>{score}</Typography>
		// 	</Grid>
		// </Grid>
	);
};

export default PlayerCard;
