import React from "react";
import {
	FaBasketball,
	FaFutbol,
	FaLocationArrow,
	FaRegCalendar,
	FaTableTennisPaddleBall,
	FaVolleyball,
} from "react-icons/fa6";
import { Competition } from "types/index";
import { TeamCard } from "./team-card";
import { PlayerCard } from "./player-card";

export interface CompetitionCardProps {
	competitionName?: string;
	sport?: string;
	competitionType?: string;
	competitionStart?: string;
	location?: string;
	price?: string;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
	competitionName,
	sport,
	competitionType,
	competitionStart,
	location,
}) => {
	const SportIcons: Record<Competition["sport"], React.ReactElement> = {
		basketball: (
			<FaBasketball className="text-xs text-gray-400 lg:text-base" />
		),
		soccer: <FaFutbol className="text-xs text-gray-400 lg:text-base" />,
		volleyball: (
			<FaVolleyball className="text-xs text-gray-400 lg:text-base" />
		),
		pickleball: (
			<FaTableTennisPaddleBall className="text-xs text-gray-400 lg:text-base" />
		),
	};

	return (
		<div className="mt-3 min-w-full rounded-md border shadow-lg lg:w-2/3 lg:min-w-0">
			<div className="grid-rows-12 grid pl-3 pr-2 pt-3">
				<div className="row-span-4 grid grid-cols-12">
					<div className="col-span-2 flex">
						<div className="h-12 w-4/5 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue md:min-h-full lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"></div>
					</div>
					<div className="col-span-7 flex flex-col">
						<h2 className="font-bold sm:text-lg lg:text-3xl">
							{competitionName}
						</h2>
						{SportIcons.pickleball}
						<div className="flex flex-row items-center">
							<FaBasketball className="text-xs text-gray-400 lg:text-base" />
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{sport} {competitionType}
							</p>
						</div>
						<div className="flex flex-row items-center">
							<FaRegCalendar className="text-xs text-gray-400 lg:text-base" />
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{competitionStart}
							</p>
						</div>
						<div className="flex flex-row items-center">
							<FaLocationArrow className="text-xs text-gray-400 lg:text-base" />
							<p className="ml-2 text-xs text-gray-400 lg:text-base">
								{location}
							</p>
						</div>
					</div>
					<div className="col-span-3 flex flex-row items-start justify-end">
						<p className="text-xs text-gray-400 lg:text-2xl">$99</p>
						<p className="ml-1 text-xs text-gray-400 lg:text-base">
							per team
						</p>
					</div>
				</div>
				<div className="row-span-6 mb-4 grid h-48 grid-cols-12 items-center">
					<div className="col-span-6 flex flex-col">
						<TeamCard name="Team Name" score={99} />
						<TeamCard name="Team Name" score={99} />
						<TeamCard name="Team Name" score={99} />
					</div>
					<div className="col-span-6 flex flex-col">
						<PlayerCard name="Player Name" score={99} />
						<PlayerCard name="Player Name" score={99} />
						<PlayerCard name="Player Name" score={99} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;
