"use client";

import React from "react";
import { ControlPoint } from "@mui/icons-material";
import {
	Autocomplete,
	Grid,
	TextField,
	Typography,
	createFilterOptions,
} from "../../providers/mui-server-components";
import { SearchBar } from "../search-bar/page";
import { PlayerCard } from "../../cards/player-card/page";
import { InputField } from "../input-field/page";

export interface PlayerDropdownProps {
	name?: String;
}

export interface PlayerOptionType {
	inputValue?: string;
	title: string;
}

const testPlayers: readonly PlayerOptionType[] = [
	{ title: "Jay Boog" },
	{ title: "Big Baller" },
];
const filter = createFilterOptions<PlayerOptionType>();

export /**
 * Search bar for finding players
 * @param {PlayerDropdownProps}
 * @returns
 */

const PlayerDropdown: React.FC<PlayerDropdownProps> = ({ name }) => {
	const [value, setValue] = React.useState<PlayerOptionType | null>(null);

	return (
		<Autocomplete
			openOnFocus={false}
			disablePortal={true}
			id="combo-box-demo"
			freeSolo
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === "string") {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue;
				}
				// Regular option
				return option.title;
			}}
			renderOption={(props, option) => <li {...props}>{option.title}</li>}
			options={testPlayers}
			sx={{ width: 480 }}
			renderInput={(params) => <InputField {...params} label="Search" />}
		/>
	);
};

export default PlayerDropdown;
