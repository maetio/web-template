import React from "react";
import { Avatar, Chip } from "../mui-server-components";

export interface PlayerDropdownChipProps {
	label: string;
	image: string;
}

/**
 * Chip that populates the search bar textfield when the user selects a player/team
 *
 * @param {PlayerDropdownChipProps} props
 * @returns
 */
const DropdownChip = (props: PlayerDropdownChipProps) => {
	return (
		<Chip
			sx={{ backgroundColor: "#EEF2FF" }}
			avatar={<Avatar src={props.image}>PN</Avatar>}
			label={props.label || "Player Name"}
		/>
	);
};

export default DropdownChip;
