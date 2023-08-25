import React from "react";
import { expectedDisplayResult } from "utils/skill-rating";
import { Team } from "types/team";

export interface WinProbParams {
	team1Rating: Team["rating"];
	team2Rating: Team["rating"];
}

export /**
 * Prebuild win probability component. Takes in team rating and returns a progress bar with their chances of winning
 *
 * @param {*} {
 * 	team1Rating,
 * 	team2Rating,
 * }
 * @return {*}
 */
const WinProb: React.FC<WinProbParams> = ({ team1Rating, team2Rating }) => {
	// for calculation, input display ratings as well
	const probTeam1 = Math.floor(
		expectedDisplayResult(team1Rating, team2Rating) * 100
	);

	const probTeam2 = probTeam1 !== undefined ? 100 - probTeam1 : 0;

	return (
		<section className="w-full flex-col">
			<div
				className={`h-2.5 w-full rounded-full ${
					probTeam2 >= probTeam1 ? "bg-indigo-600" : "bg-indigo-300"
				}`}
			>
				<div
					style={{ width: `${probTeam1}%` }}
					className={`h-2.5 rounded-full  ${
						probTeam2 < probTeam1
							? "bg-indigo-600"
							: "bg-indigo-300"
					}`}
				></div>
			</div>
			<div className="mt-1 flex flex-row justify-between">
				<p className="  text-sm font-bold leading-tight tracking-tight text-black">
					{probTeam1}%
				</p>
				<p className=" text-center text-sm font-normal leading-tight tracking-tight text-gray-500">
					Win Probability
				</p>
				<p className="  text-right text-sm font-bold leading-tight tracking-tight text-black">
					{probTeam2}%
				</p>
			</div>
		</section>
	);
};
