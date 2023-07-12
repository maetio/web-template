import React from "react";
import { FaBasketball, FaLocationArrow, FaRegCalendar } from "react-icons/fa6";

export interface CompetitionCardProps {
    competitionName?: string
}

const CompetitionCard: React.FC<CompetitionCardProps> = () => {
	return (
		<div className="border rounded-md shadow">
			<div className="grid grid-rows-12 pl-3 pt-2">
				<div className="grid row-span-4 grid-cols-12 gap-2">
					<div className="col-span-3 flex">
						<div className="h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
					</div>
					<div className="col-span-6">
						<h2 className="font-bold text-2xl">Competition Name</h2>
						<div className="flex-row flex items-center">
							<FaBasketball className="text-gray-400" />
							<text className="text-gray-400 ml-2">Basketball Tournament</text>
						</div>
						<div className="flex-row flex items-center">
							<FaRegCalendar className="text-gray-400" />
							<text className="text-gray-400 ml-2">June 27 at 12:00 PM</text>
						</div>
						<div className="flex-row flex items-center">
							<FaLocationArrow className="text-gray-400" />
							<text className="text-gray-400 ml-2">1234 Neighborhood St, City, IN</text>
						</div>
					</div>
					<div className="col-span-3 flex justify-end flex-row">
						<text className="text-3xl text-gray-400">$99</text>
						<text className="text-gray-400 ml-1">per team</text>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompetitionCard;