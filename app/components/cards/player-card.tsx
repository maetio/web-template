import React from "react";
import { FaMedal } from "react-icons/fa6";

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
				<svg className={"h-4 w-4 lg:h-6 lg:w-6 dark:fill-white"} viewBox="0 0 1500 1500">
					<path
						d="M7230 14550c-1117-42-2209-353-3180-905-1782-1013-3036-2758-3419-4760-88-456-124-844-124-1330s36-874 124-1330c325-1697 1281-3225 2669-4266C4397 1136 5664 665 7040 570c186-13 742-13 930 0 2264 155 4289 1373 5487 3300 603 970 954 2066 1033 3228 13 198 13 716 0 914-64 933-293 1795-699 2623-769 1569-2100 2797-3726 3438-886 349-1864 513-2835 477zm715-580c691-50 1326-196 1963-451 212-84 642-295 837-410 459-269 860-577 1249-959 382-375 660-714 919-1118 566-882 898-1857 999-2927 20-215 17-943-5-1155-88-845-297-1564-667-2295-330-653-705-1163-1241-1690-416-409-827-721-1317-999-808-459-1674-728-2627-818-220-21-945-17-1160 5-849 89-1562 297-2305 672-1322 668-2397 1812-2989 3181-559 1294-676 2747-331 4124 417 1662 1505 3107 2995 3979 173 102 503 269 691 350 658 284 1363 457 2089 510 162 12 739 12 900 1z"
						transform="matrix(.1 0 0 -.1 0 1500)"
					/>
					<path
						d="M3391 11159c-66-13-142-60-184-115-123-160-69-393 111-481l57-28h8260l50 25c64 31 124 92 156 155 20 42 24 64 24 135-1 72-5 93-28 137-36 69-88 120-156 152l-56 26-4095 1c-2256 1-4115-2-4139-7zM4495 9876c-134-42-215-146-223-286-8-138 53-242 176-302l67-33h5980l56 26c114 54 179 149 187 273 8 130-60 246-176 303l-57 28-2985 2c-2379 1-2993-1-3025-11zM4478 8595c-92-34-168-114-198-208-18-58-9-173 18-229 30-60 90-120 150-150l47-23h6020l50 27c60 32 114 87 146 148 34 65 34 204 0 272-29 61-89 120-149 150l-47 23-3000 2c-2524 1-3006-1-3037-12zM5717 7329c-133-31-229-141-244-279-16-152 79-291 228-334 49-15 230-16 1824-14l1770 3 55 26c80 37 115 72 152 147 81 164 15 353-151 431l-56 26-1770 2c-1012 0-1786-3-1808-8zM6653 6041c-263-91-285-460-34-583l46-23 824-3c930-3 881-6 970 74 151 136 141 374-21 493-85 62-63 61-937 61-738-1-800-2-848-19zM6643 4763c-60-21-137-94-170-161-24-48-28-70-28-137s4-89 28-137c35-70 101-131 174-158 54-20 69-20 871-18l817 3 57 28c63 31 115 85 149 156 31 64 32 186 2 252-31 68-90 128-158 161l-60 28-820-1c-701 0-826-3-862-16zM5709 3496c-231-62-313-331-159-518 18-21 59-51 98-70l67-33h3580l56 26c117 55 184 160 184 289s-67 234-184 289l-56 26-1770 2c-1382 1-1780-1-1816-11z"
						transform="matrix(.1 0 0 -.1 0 1500)"
					/>
				</svg>
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