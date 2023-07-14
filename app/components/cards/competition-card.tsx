import React from "react";
import { FaBasketball, FaLocationArrow, FaRegCalendar } from "react-icons/fa6";
import { TeamCard } from "./team-card";
import { PlayerCard } from "./player-card";

export interface CompetitionCardProps {
    competitionName?: string
	sport?: string
	competitionType?: string
	competitionStart?: string
	location?: string
	price?: string
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({competitionName, sport, competitionType, competitionStart, location }) => {
	
	return (
		<div className="border rounded-md shadow-lg lg:w-2/3 lg:min-w-0 min-w-full mt-3">
			<div className="grid grid-rows-12 pl-3 pt-3 pr-2">
				<div className="grid row-span-4 grid-cols-12">
					<div className="col-span-2 flex">
						<div className="2xl:w-36 2xl:h-36 lg:h-24 lg:w-24 lg:min-h-0 w-4/5 h-12 md:min-h-full rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
					</div>
					<div className="col-span-7 flex-col flex">
						<h2 className="font-bold lg:text-3xl sm:text-lg">{competitionName}</h2>
						<div className="flex-row flex items-center">
							<FaBasketball className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{sport} {competitionType}</p>
						</div>
						<div className="flex-row flex items-center">
							<FaRegCalendar className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{competitionStart}</p>
						</div>
						<div className="flex-row flex items-center">
							<FaLocationArrow className="text-gray-400 text-xs lg:text-base" />
							<p className="text-gray-400 ml-2 text-xs lg:text-base">{location}</p>
						</div>
					</div>
					<div className="col-span-3 flex flex-row items-start justify-end">
						<p className="lg:text-2xl text-gray-400 text-xs">$99</p>
						<p className="text-gray-400 ml-1 text-xs lg:text-base">per team</p>
					</div>
				</div>
				<div className="row-span-6 grid grid-cols-12 h-48 items-center mb-4">
					<div className="col-span-6 flex flex-col">
						<TeamCard name="Team Name" score={99} />
						<TeamCard name="Team Name" score={99} />
						<TeamCard name="Team Name" score={99} />
					</div>
					<div className="col-span-6 flex flex-col">
						<PlayerCard name="Player Name" score={99}/>
						<PlayerCard name="Player Name" score={99}/>
						<PlayerCard name="Player Name" score={99}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;