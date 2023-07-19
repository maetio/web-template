import { SportIcons } from "app/components/icons";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Competition } from "types/competition";

interface CompetitionTypeParams extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    type: Competition["type"];
    sport: Competition["sport"];
}

export const CompetitionType = ({ type, sport, className, ...divParams }: CompetitionTypeParams) => {
	// get the icon
	const SportIcon = SportIcons[sport];

	// define the string
	const compTypeString = `${sport.charAt(0).toUpperCase() + sport.slice(1)  } ${  type.charAt(0).toUpperCase()  }${type.slice(1)}`;

	return (
		<div className={"relative ".concat(className || "")} {...divParams}>
			<dt className="flex items-center justify-start gap-x-3 text-base font-semibold leading-7">
				<div className="self-center flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
					<SportIcon className="h-6 w-6 flex-none text-white" aria-hidden="true" />
				</div>
				{compTypeString}
			</dt>
			{/* <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd> */}
		</div>
	);
};