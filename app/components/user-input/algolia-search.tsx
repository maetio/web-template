"use client";

import React from "react";
import { ControlPoint } from "@mui/icons-material";
import { InputField } from "app/components/user-input";
import {
	Autocomplete,
	Grid,
	TextField,
	Typography,
	createFilterOptions,
} from "app/components/providers/mui-server-components";
import { PlayerCard } from "../../cards/player-card/page";

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

const AlgoliaSearchComp: React.FC<PlayerDropdownProps> = ({ name }) => {
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
			// eslint-disable-next-line react/jsx-props-no-spreading
			renderOption={(props, option) => <li {...props}>{option.title}</li>}
			options={testPlayers}
			sx={{ width: 480 }}
			renderInput={(params) => <InputField {...params} label="Search" />}
		/>
	);
};
