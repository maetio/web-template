import React from "react";
import { MaetIcon } from "../icons";

interface RatedCompetitionCardParams {
	className?: string;
	joinable?: boolean;
}

export /**
 * card that display a message about the rating system
 *
 *
 * @param {*} {
 * 	className,
 * }
 * @return {*}
 */
const RatedCompetitionCard: React.FC<RatedCompetitionCardParams> = ({
	className,
	joinable,
}) => {
	return (
		<div
			className={`inline-flex flex-col items-start justify-center gap-4 rounded-2xl bg-indigo-600 p-4 ${className}`}
		>
			<p className="self-stretch text-xs font-bold leading-tight tracking-tight text-indigo-300">
				RATED COMPETITION
			</p>
			<div className="inline-flex flex-wrap items-center justify-start gap-2.5 self-stretch">
				<MaetIcon
					size={14}
					color="fill-white"
					className="w-14 text-white"
				/>
				<h6 className="shrink grow basis-0 text-xl font-bold leading-normal tracking-tight text-white">
					{joinable
						? "You will be able to earn rating points at this competition."
						: "This is a rated competition."}
				</h6>
			</div>
			<p className="flex flex-wrap self-stretch text-xs font-normal leading-none tracking-tight text-white">
				{joinable
					? "Your rating helps determine your pickleball ranking and eligibility for select competitions."
					: "The Maet rating helps determine players’ pickleball ranking and eligibility for select competitions."}
			</p>
		</div>
	);
};
