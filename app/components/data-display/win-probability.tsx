import React from "react";

export interface WinProbParams {
	team1Prob: number;
	team2Prob: number;
}

export /**
 * Prebuild win probability component. Takes in team rating and returns a progress bar with their chances of winning
 *
 *
 * @param {*} { team1Prob, team2Prob }
 * @return {*}
 */
const WinProb: React.FC<WinProbParams> = ({ team1Prob, team2Prob }) => {
	return (
		<section className="w-full flex-col">
			<div
				className={`h-2.5 w-full rounded-full ${
					team2Prob >= team1Prob ? "bg-indigo-600" : "bg-indigo-300"
				}`}
			>
				<div
					style={{ width: `${team1Prob}%` }}
					className={`h-2.5 rounded-full  ${
						team2Prob < team1Prob
							? "bg-indigo-600"
							: "bg-indigo-300"
					}`}
				></div>
			</div>
			<div className="mt-1 flex flex-row justify-between">
				<p className="  text-sm font-bold leading-tight tracking-tight text-black">
					{team1Prob}%
				</p>
				<p className=" text-center text-sm font-normal leading-tight tracking-tight text-gray-500">
					Win Probability
				</p>
				<p className="  text-right text-sm font-bold leading-tight tracking-tight text-black">
					{team2Prob}%
				</p>
			</div>
		</section>
	);
};
