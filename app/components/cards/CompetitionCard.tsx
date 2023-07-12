import React from "react";
import { FaBasketball, FaLocationArrow, FaRegCalendar } from "react-icons/fa6";
import { TeamCard } from "./TeamCard";
import { PlayerCard } from "./PlayerCard";

export interface CompetitionCardProps {
    competitionName?: string
}

const CompetitionCard: React.FC<CompetitionCardProps> = () => {
	return (
		<div className="border rounded-md shadow bg-lighterGray lg:w-2/3">
			<div className="grid grid-rows-12 pl-3 pt-2 pr-2">
				<div className="grid row-span-4 grid-cols-12">
					<div className="col-span-2 flex">
						<div className="2xl:w-36 2xl:h-36 w-4/5 h-2/3 md:min-h-full rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
					</div>
					<div className="col-span-7 flex-col justify-start flex">
						<h2 className="font-bold lg:text-3xl sm:text-lg">Competition Name</h2>
						<div className="flex-row flex items-center">
							<FaBasketball className="text-gray-400 text-xs lg:text-base" />
							<text className="text-gray-400 ml-2 text-xs lg:text-base">Basketball Tournament</text>
						</div>
						<div className="flex-row flex items-center">
							<FaRegCalendar className="text-gray-400 text-xs lg:text-base" />
							<text className="text-gray-400 ml-2 text-xs lg:text-base">June 27 at 12:00 PM</text>
						</div>
						<div className="flex-row flex items-center">
							<FaLocationArrow className="text-gray-400 text-xs lg:text-base" />
							<text className="text-gray-400 ml-2 text-xs lg:text-base">1234 Neighborhood St, City, IN</text>
						</div>
					</div>
					<div className="col-span-3 flex flex-row items-start justify-end">
						<text className="lg:text-2xl text-gray-400 text-xs">$99</text>
						<text className="text-gray-400 ml-1 text-xs lg:text-base">per team</text>
					</div>
				</div>
				<div className="row-span-6 grid grid-cols-12 h-48 items-center">
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