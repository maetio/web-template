import React from "react";
import { MaetIcon } from "../icons";

export /**
 * card that display a message about the rating system
 *
 * @return {*}
 */
const RatedCompetitionCard = () => {
	return (
		<div className="inline-flex flex-col items-start justify-center gap-4 rounded-2xl bg-indigo-600 p-4">
			<p className="self-stretch text-xs font-bold leading-tight tracking-tight text-indigo-300">
				RATED COMPETITION
			</p>
			<div className="inline-flex flex-wrap items-center justify-start gap-2.5 self-stretch">
				<MaetIcon size={14} color="fill-white" className="text-white w-14" />
				<h6 className="shrink grow basis-0 text-xl font-bold leading-normal tracking-tight text-white">
					You will be able to earn rating points at this competition.
				</h6>
			</div>
			<p className="flex flex-wrap self-stretch text-xs font-normal leading-none tracking-tight text-white">
				Your rating helps determine your pickleball ranking and
				eligibility for select competitions.
			</p>
		</div>
	);
};
