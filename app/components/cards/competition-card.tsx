import React from "react";
import { FaBasketball, FaFutbol, FaLocationArrow, FaRegCalendar, FaVolleyball } from "react-icons/fa6";
import { Competition } from "types/index";
import { MdSportsTennis } from "react-icons/md";
import { showTimeOrDate } from "utils/date";
import { BaseURL } from "config/constants";
import { TopPlayersResponseType } from "types/next-api";
import { PlayerCard } from "./player-card";

export interface CompetitionCardProps extends Omit<
React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>,
"color"
>{
    competition: Partial<Competition>
	price?: string
	width?: number,
	num?: number
}
export
/**
 * Async function that displays competition information as a card
 * @export
 * @param {CompetitionCardProps} {competition, price, width, ...divParams } 
 * @returns 
 */
const CompetitionCard: React.FC<CompetitionCardProps> = async ({competition, price, width, num, ...divParams }) => {

	// get the top [num] players for a competition
	const topPlayersResponse = await fetch(`${BaseURL}/api/players/${competition.id}/${num || 3}`);
	const topPlayers: TopPlayersResponseType = await topPlayersResponse.json();

	const SportIcons: Record<Competition["sport"], React.ReactElement> = {
		basketball: <FaBasketball className="text-gray-400 text-xs lg:text-base"/>,
		soccer: <FaFutbol className="text-gray-400 text-xs lg:text-base" />,
		volleyball: <FaVolleyball className="text-gray-400 text-xs lg:text-base" />,
		pickleball: <MdSportsTennis className="text-gray-400 text-xs lg:text-base"  />
	};

	const capitalizeFirstLetter = (str?: String) => {
		if (str) return str.charAt(0).toUpperCase() + str.slice(1);
		return "";
	};

	return (
		<div {...divParams} className={`border w-${String(width) || "auto" } rounded-md shadow-lg lg:w-2/3 mt-3 p-2 min-w-full`}>
			<div className="grid grid-rows-12 pl-3 pt-3 pr-2">
				<div className="grid row-span-4 grid-cols-12">
					<div className="col-span-2 flex">
						{competition.image ? (
							<img
								className="2xl:w-36 2xl:h-36 lg:h-24 lg:w-24 lg:min-h-0 sm:w-16 sm:h-16 w-12 h-12 flex-none rounded-md bg-gray-50"
								src={competition.image || undefined}
								alt=""
							/>
						) : (
							<div className="2xl:w-36 2xl:h-36 lg:h-24 lg:w-24 lg:min-h-0 sm:w-16 sm:h-16 w-12 h-12 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
						)}
					</div>
					<div className="col-span-7 flex-col flex">
						<h2 className="font-bold lg:text-3xl sm:text-lg">{competition.name}</h2>
						<div className="flex-row flex items-center">
							{competition.sport ? SportIcons[competition.sport] : null}
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{capitalizeFirstLetter(competition.sport)} {capitalizeFirstLetter(competition.type)}</p>
						</div>
						<div className="flex-row flex items-center">
							<FaRegCalendar className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{showTimeOrDate(new Date(competition.startTimeISO || ""))}</p>
						</div>
						{competition.location?.address && 
						<div className="flex-row flex items-center">
							<FaLocationArrow className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{competition.location?.address}</p>
						</div>}
					</div>
					<div className="col-span-3 flex flex-row items-start justify-end">
						{competition.price ? (
							<div className="flex">
								<p className="text-xs text-gray-400 lg:text-2xl">${competition.price}</p>
								<p className="ml-1 text-xs text-gray-400 lg:text-base">
							per team
								</p>
							</div>) : (<div className="flex">
							<p className="text-xs text-gray-400 lg:text-2xl">Free</p>
						</div>)}
					</div>
				</div>
				<div className="row-span-6 mb-4 grid h-48 grid-cols-12 items-center gap-8">
					<div className="col-span-6 flex flex-col">
						{topPlayers.map((player, rank) => (
							<PlayerCard key={player.id} player={player} ranking={rank} />
						))}
					</div>
					<div className="col-span-6 flex flex-col">

					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;
