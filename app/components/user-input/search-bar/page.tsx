"use client";

import React from "react";
import { Search } from "@mui/icons-material";
import { InputField } from "../input-field/page";
import {
	InputAdornment,
	TextField,
} from "../../providers/mui-server-components";

export type SearchBarProps = {
	label: string;
};

/**
 * Search bar "input field" to be used for larger team and player search bar components
 *
 * @param {SearchBarProps} props
 * @returns
 */
export const SearchBar = (props: SearchBarProps) => {
	return (
		<TextField
			color="primary"
			label={props.label || "Search"}
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
				endAdornment: (
					<InputAdornment position="end">
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
