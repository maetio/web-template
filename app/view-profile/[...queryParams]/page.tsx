import React from "react";
import { BaseURL } from "config/constants";
import { GameProfilesResponseType, PlayerResponseType } from "types/next-api";
import {
	FaBasketball,
	FaFutbol,
	FaLocationArrow,
	FaVolleyball,
} from "react-icons/fa6";
import { HiArrowUp, HiArrowDown } from "react-icons/hi2";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { HeaderMaetIcon } from "app/components/icons";
import { MdSportsTennis } from "react-icons/md";
import { Competition } from "types/competition";
import { GameCard } from "app/components/cards";
import LineChart from "app/components/data-vis/line-chart";

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
		basketball: <FaBasketball className="text-xs lg:text-base" />,
		soccer: <FaFutbol className="text-xslg:text-base" />,
		volleyball: <FaVolleyball className="text-xs lg:text-base" />,
		pickleball: <MdSportsTennis className="text-xs lg:text-base" />,
	};

	
	return (
		<main className="mx-10 space-y-12">
			<div className="flex flex-col justify-center pt-8">
				<div className="mb-6">
					<div className="flex flex-row items-center space-x-3">
						{profileData?.image ? (
							<img
								className="h-28 w-28 flex-none rounded-full bg-gray-50"
								src={profileData.image || undefined}
								alt=""
							/>
						) : (
							<div className="h-4 w-4 rounded-full bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue md:h-8 md:w-8 md:rounded-md"></div>
						)}
						<h3 className="font-bold leading-6 text-gray-900 text-2xl">{profileData.firstName} {profileData.lastName}</h3>
						<div className="flex items-center flex-row">
							<FaLocationArrow className="text-gray-500" />
							<p className="ml-2 text-gray-500">South Bend, IN</p>
						</div>
						<div className="flex flex-row space-x-5">
							<button className="flex items-center gap-x-2 rounded-full border p-2 shadow-sm ring-1 ring-inset ring-white hover:bg-gray-300">
								{SportIcons.pickleball}
								<p className="text-xs lg:text-base">
											Pickleball
								</p>
							</button>
							<button className="flex items-center gap-x-2 rounded-full border p-2 shadow-sm ring-1 ring-inset ring-white hover:bg-gray-300">
								{SportIcons.basketball}
								<p className="text-xs lg:text-base">
											Basketball
								</p>
							</button>
						</div>
					</div>
					<dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
						<div className="px-4 py-5 sm:p-6">
							<dt className="text-xl font-semibold text-gray-900">Average Rating</dt>
							<dd className="mt-3 flex items-baseline justify-between md:block lg:flex">
								<div className="flex items-center text-2xl font-semibold">
									<HeaderMaetIcon/>
									<p className="ml-2 text-2xl font-bold md:text-2xl text-primaryMain">{Math.round(
										profileData.rating?.displayRating || 100
									)}</p>
								</div>

								<div
									className={classNames(
										profileData?.deltaRating?.displayRating &&
											profileData?.deltaRating
												?.displayRating >= 0
											? "text-green-600"
											: "text-red-600",
										"ml-2 flex items-center text-xs font-bold md:text-base"
									)}
								>
									{profileData?.deltaRating?.displayRating &&
							profileData?.deltaRating?.displayRating >= 0 ? (
											<HiArrowUp className="flex items-baseline text-xs font-bold text-green-600 md:text-base" />
										) : (
											<HiArrowDown className="flex items-baseline text-xs font-bold text-red-600 md:text-base" />
										)}

									{Math.round(
										profileData?.deltaRating?.displayRating || 0
									)}
								</div>
							</dd>
						</div>
						<div className="px-4 py-5 sm:p-6">
							<dt className="text-xl font-semibold text-gray-900">Games Played</dt>
							<dd className="mt-3 flex items-baseline justify-between md:block lg:flex">
								<div className="flex items-center text-2xl font-semibold">
									<p className="ml-2 text-2xl font-bold md:text-2xl text-primaryMain">{gameProfiles.length}</p>
								</div>
							</dd>
						</div>
						<div className="px-4 py-5 sm:p-6">
							<dt className="text-xl font-semibold text-gray-900">Data Visualization</dt>
							<dd className="mt-3 flex items-baseline justify-between md:block lg:flex">
								<LineChart variable={`${profileData.firstName} ${profileData.lastName}`} dataset={gameProfiles.map((data) => Math.round(data.rating?.displayRating || 100))} title="Rating Change Over Time" labels={gameProfiles.map((data) => (String(data.id)))} />
							</dd>
						</div>
					</dl>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex flex-row gap-x-8">
						<button>
							<BiSolidLeftArrow className="hover:fill-gray-700" />
						</button>
						<h1 className="text-lg font-semibold md:text-xl">
							Games
						</h1>
						<button>
							<BiSolidRightArrow className="hover:fill-gray-700" />
						</button>
					</div>
					<div className="flex flex-col items-center">
						{gameProfiles.map((gameProf) => (
							<GameCard
								id={gameProf.gameID}
								key={gameProf.gameID}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
