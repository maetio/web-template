"use client";

import React from "react";
import { ControlPoint } from "@mui/icons-material";
import { Autocomplete, Grid, TextField, Typography, createFilterOptions } from "../../providers/mui-server-components";
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

const testPlayers: PlayerOptionType[] = [
	{title: "Jay Boog"}
];

const filter = createFilterOptions<PlayerOptionType>();

export /**
 * Search bar for finding players
 * @param {PlayerDropdownProps}
 * @returns
 */

const PlayerDropdown: React.FC<PlayerDropdownProps> = ({name}) => {

	const [value, setValue] = React.useState<PlayerOptionType | null>(null);

	return (
		<Autocomplete
			openOnFocus={false}
			disablePortal={true}
			id="combo-box-demo"
			freeSolo
			options={testPlayers}
			sx={{ width: 300 }}
			renderInput={(params) => <InputField {...params} label="SKU" />} />
	  );
};



export default PlayerDropdown;
