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
		<div
			className={"flex items-center justify-start gap-x-1 text-xs ".concat(
				className || ""
			)}
			{...divParams}
		>
			<div className="flex h-5 w-5 items-center justify-center self-center rounded-lg ">
				<SportIcon
					className="h-5 w-5 flex-none text-gray-600"
					aria-hidden="true"
				/>
			</div>
			{compTypeString}
		</div>
	);
};

interface CompDisplayDataParams extends CompetitionTypeParams {
	location?: Competition["location"];
	startTimeISO?: Competition["startTimeISO"];
	endTimeISO?: Competition["endTimeISO"];
}

export /**
 * Will display the full comp display data
 *
 * @param {CompDisplayDataParams} {
 * 	type,
 * 	sport,
 * 	location,
 * 	startTimeISO,
 * 	endTimeISO,
 * 	className,
 * 	...divParams
 * }
 * @return {*}
 */
const CompDisplayData = ({
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
		<div
			className={`flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6
				${className || ""}
			`}
			{...divParams}
		>
			<div className="text-md flex items-center">
				<SportIcon
					className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-900"
					aria-hidden="true"
				/>
				{compTypeString}
			</div>
			{location?.name?.length ? (
				<div className="text-md mt-2 flex items-center">
					<MdLocationOn
						className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-900"
						aria-hidden="true"
					/>
					{location?.name}
				</div>
			) : null}
			{startTimeISO ? (
				<div className="text-md mt-2 flex items-center">
					<MdOutlineCalendarMonth
						className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-900"
						aria-hidden="true"
					/>
					{new Date(startTimeISO || "").toLocaleDateString()}
					{endTimeISO
						? ` - ${new Date(
								endTimeISO || ""
						  ).toLocaleDateString()}`
						: ""}
				</div>
			) : null}
		</div>
	);
};
