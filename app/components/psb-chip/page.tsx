import React from "react";
import { Avatar, Chip } from "../mui-server-components";

export interface PlayerSearchBarChipProps {
    label: string;
	image: string;
}

/**
 * Chip that populates the search bar textfield when the user selects a player/team
 * 
 * @param {PlayerSearchBarChipProps} props 
 * @returns 
 */
const SearchBarChip = (props: PlayerSearchBarChipProps) => {
	return (
		<Chip sx={{backgroundColor: "#EEF2FF"}} avatar={<Avatar src={props.image}>PN</Avatar>} label={props.label || "Player Name"}/>
	);
};

export default SearchBarChip;
