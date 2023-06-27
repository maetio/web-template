import React from "react";
import { Avatar, Chip } from "../../providers/mui-server-components";

export interface TeamDropdownChipProps {
	label: string;
	image?: string;
}

const TeamDropdownChip: React.FC<TeamDropdownChipProps> = ({
	label,
	image,
}) => {
	return (
		<Chip
			sx={{ backgroundColor: "#EEF2FF" }}
			avatar={<Avatar>PN</Avatar>}
			label={label || "Player Name"}
		/>
	);
};

export default TeamDropdownChip;
