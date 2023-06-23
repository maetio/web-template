import React from "react";
import { Avatar, Chip } from "../mui-server-components";

export interface TeamSearchBarChipProps {
    label: string;
    image?: string;
}

const TeamSearchBarChip = (props: TeamSearchBarChipProps) => {
	return (
		<Chip sx={{backgroundColor: "#EEF2FF"}} avatar={<Avatar>PN</Avatar>} label={props.label || "Player Name"}/>
	);
};

export default TeamSearchBarChip;