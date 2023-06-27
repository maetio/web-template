"use client";

import React from "react";
import { Search } from "@mui/icons-material";
import {
	InputAdornment,
	TextField,
} from "../../providers/mui-server-components";

export interface SearchBarProps {
	label: string;
}

/**
 * Search bar "input field" to be used for larger team and player search bar components
 *
 * @param {SearchBarProps}
 * @returns
 */
export const SearchBar: React.FC<SearchBarProps> = ({ label }) => {
	return (
		<TextField
			color="primary"
			label={label || "Search"}
			sx={{
				fieldset: {
					border: 1,
					borderRadius: 3,
					borderColor: "#D9D9D9",
				},
				backgroundColor: "#f5f5f5",
				width: 480,
				borderRadius: 3,
			}}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<Search
							sx={{ stroke: "#404040", strokeWidth: 2 }}
						></Search>
					</InputAdornment>
				),
			}}
		></TextField>
	);
};

export default SearchBar;
