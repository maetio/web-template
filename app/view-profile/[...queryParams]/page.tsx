import React from "react";
import { BaseURL } from "config/constants";
import { GameProfilesResponseType, PlayerResponseType } from "types/next-api";
import { FaArrowTrendDown, FaArrowTrendUp, FaBasketball, FaFutbol, FaLocationArrow, FaVolleyball } from "react-icons/fa6";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { MaetIcon } from "app/components/icons";
import { MdSportsTennis } from "react-icons/md";
import { Competition } from "types/competition";
import { capitalizeFirstLetter } from "utils/format";
import { GameCard } from "app/components/cards";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
/**
 * View profile screen will render the data with the profile
 *
 * @export
 * @param {{
 * 	params: { id: string };
 * }} {
 * 	params,
 * }
 * @return {*}
 */
export default async function ViewProfileScreen({
	params,
}: {
	params: { queryParams: Array<string | undefined> };
}) {
	// get the parameters from the query
	const [userID, sport] = params.queryParams;

	// fetch call to get the user's player profile
	const profileResponse = await fetch(
		`${BaseURL}/api/player/${userID}/${sport}`
	);
	const profileData: PlayerResponseType = await profileResponse.json();

	// fetch the game profiles for the profile
	const gameProfilesResponse = await fetch(
		`${BaseURL}/api/game-profiles/${profileData.id}`
	);
	const gameProfiles: GameProfilesResponseType =
		await gameProfilesResponse.json();

	const SportIcons: Record<Competition["sport"], React.ReactElement> = {
		basketball: (
			<FaBasketball className="text-xs lg:text-base" />
		),
		soccer: <FaFutbol className="text-xslg:text-base" />,
		volleyball: (
			<FaVolleyball className="text-xs lg:text-base" />
		),
		pickleball: (
			<MdSportsTennis className="text-xs lg:text-base" />
		),
			
	};
		
	return (
		<main className="mx-10 space-y-12">
			{/* <h1>
				{profileData.firstName} {profileData.lastName}: {profileData.id}
			</h1>
			<h1>Number of games: {profileData.rating?.numGames}</h1>
			<h2>{profileData.rating?.displayRating}</h2>
			{gameProfiles.map((gameProf) => (
				<div key={gameProf.id}>
					<br />
					<h3>Game id: {gameProf.gameID}</h3>
					<h3>Rating: {gameProf.rating?.displayRating}</h3>
					<h3>Num Games: {gameProf.rating?.numGames}</h3>
					<h3>
						Change:{" "}
						{gameProf.deltaRating?.displayRating &&
						gameProf.deltaRating?.displayRating > 0
							? "+"
							: ""}
						{gameProf.deltaRating?.displayRating}
					</h3>
					<h3>
						Next Game Rating:{" "}
						{Number(gameProf.rating?.displayRating) +
							Number(gameProf.deltaRating?.displayRating)}
					</h3>
					<br />
				</div>
			))} */}
			<div className="flex flex-row pt-8 gap-x-3">
				{profileData?.image ? (
					<img
						className="h-28 w-28 flex-none rounded-full bg-gray-50"
						src={profileData.image || undefined}
						alt=""
					/>
				) : (
					<div className="h-4 w-4 rounded-full bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue md:h-8 md:w-8 md:rounded-md"></div>
				)}
				<div className="flex-col flex">
					<h1 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h1>
					<div className="flex-row flex items-center gap-x-4">
						<div className="flex items-center">
							<FaLocationArrow className="text-gray-500" />
							<p className="text-gray-500 ml-2">South Bend, IN</p>
						</div>
						<div className="flex items-center">
							<MaetIcon size={6} className="text-gray-500" />
							<p className="font-bold ml-2 text-xs md:text-base">{Math.round(profileData.rating?.displayRating || 100)}</p>
						</div>
						<div className="flex items-center">
							{profileData?.deltaRating?.displayRating &&
								profileData?.deltaRating?.displayRating >= 0
								? <FaArrowTrendUp className=
									"text-green-600 flex items-baseline text-xs md:text-base font-bold"
								/>
								: <FaArrowTrendDown className=
									"text-red-600 flex items-baseline text-xs md:text-base font-bold"
								/>}
							
							<p
								className={classNames(
									profileData?.deltaRating?.displayRating &&
								profileData?.deltaRating?.displayRating >= 0
										? "text-green-600"
										: "text-red-600",
									"ml-2 flex font-bold text-xs md:text-base"
								)}
							>
								{profileData?.deltaRating?.displayRating &&
						profileData?.deltaRating?.displayRating >= 0
									? "+"
									: "-"}
								{Math.round(profileData?.deltaRating?.displayRating || 0)}
							</p>
						</div>	
						<div className="ml-4 flex flex-row">
							<button className="flex rounded-full border items-center gap-x-2 p-2 shadow-sm ring-1 ring-inset ring-white hover:bg-gray-300">
								{profileData.sport
									? SportIcons[profileData.sport]
									: null}
								<p className="text-xs lg:text-base">
									{capitalizeFirstLetter(profileData.sport)}{" "}
								</p>
							</button>
						</div>	
					</div>
				</div>
				
			</div>
			<div className="flex flex-row justify-between">
				<div className="flex-col flex">
					<h1 className="font-semibold text-lg md:text-xl">Current Teams</h1>
					<h1 className="font-semibold text-lg md:text-xl">Previous Teams</h1>
				</div>
				<div className="flex-col flex items-center">
					<div className="flex flex-row gap-x-8">
						<button>
							<BiSolidLeftArrow />
						</button>
						<h1 className="font-semibold text-lg md:text-xl">Games</h1>
						<button>
							<BiSolidRightArrow />
						</button>
					</div>
					<div className="flex">
						<p className="md:text-base text-sm">{gameProfiles.length} scheduled games</p>
					</div>
					<div className="flex flex-col items-center">
						{gameProfiles.map((game) => (
							<GameCard game={game} key={game.id} />
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
