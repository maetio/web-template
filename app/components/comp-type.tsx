import { SportIcons } from "app/components/icons";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { MdLocationOn, MdOutlineCalendarMonth } from "react-icons/md";
import { Competition } from "types/competition";

interface CompetitionTypeParams
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	type: Competition["type"];
	sport: Competition["sport"];
}

export /**
 * Will show the bare competition type
 *
 * @param {CompetitionTypeParams} {
 * 	type,
 * 	sport,
 * 	className,
 * 	...divParams
 * }
 * @return {*} 
 */
const CompetitionType = ({
	type,
	sport,
	className,
	...divParams
}: CompetitionTypeParams) => {
	// get the icon
	const SportIcon = SportIcons[sport];

	// define the string
	const compTypeString = `${
		sport.charAt(0).toUpperCase() + sport.slice(1)
	} ${type.charAt(0).toUpperCase()}${type.slice(1)}`;

	return (
		<div className={"relative ".concat(className || "")} {...divParams}>
			<dt className="flex items-center justify-start gap-x-3 text-base leading-7">
				<div className="flex h-10 w-10 items-center justify-center self-center rounded-lg bg-indigo-600">
					<SportIcon
						className="h-6 w-6 flex-none text-white"
						aria-hidden="true"
					/>
				</div>
				{compTypeString}
			</dt>
			{/* <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd> */}
		</div>
	);
};

interface CompDisplayDataParams extends CompetitionTypeParams {
	location?: Competition["location"];
	startTimeISO?: Competition["startTimeISO"];
	endTimeISO?: Competition["endTimeISO"];
}

export const CompDisplayData = ({ 
	type,
	sport,
	location,
	startTimeISO,
	endTimeISO,
	className,
	...divParams
}: CompDisplayDataParams) => {
	// get the icon
	const SportIcon = SportIcons[sport];

	// define the string
	const compTypeString = `${
		sport.charAt(0).toUpperCase() + sport.slice(1)
	} ${type.charAt(0).toUpperCase()}${type.slice(1)}`;

	return (
		<div className={"my-6 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6".concat(className || "")} {...divParams}>
			<div className="mt-2 flex items-center text-sm text-gray-500">
				<SportIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
				{compTypeString}
			</div>
			{location?.name ?? 
				<div className="mt-2 flex items-center text-sm text-gray-500">
					<MdLocationOn className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
					{location?.name}
				</div>
			}
			{startTimeISO ??
				<div className="mt-2 flex items-center text-sm text-gray-500">
					<MdOutlineCalendarMonth className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
					{new Date(startTimeISO || "").toLocaleDateString()}{endTimeISO ?? ` - ${new Date(endTimeISO || "")}`}
				</div>
			}
		</div>
	);
};
