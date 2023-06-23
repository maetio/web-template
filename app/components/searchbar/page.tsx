"use client";

import React from "react";
import { Search } from "@mui/icons-material";
import { InputField } from "../textfield/page";
import { InputAdornment, TextField } from "../mui-server-components";

type SearchBarProps = {
	label: string;
};

/**
 * Search bar "input field" to be used for larger team and player search bar components
 * 
 * @param {SearchBarProps} props 
 * @returns 
 */
const SearchBar = (props: SearchBarProps) => {
	return(
		<TextField 
			label={props.label || "Search"} 
			sx={{ fieldset: { border: 1, borderRadius: 2,  borderColor: "#D9D9D9" }, mt: 2, ml: 2, backgroundColor: "#f5f5f5" }}
			InputProps={{
				startAdornment: <InputAdornment position="end">
					<Search></Search>
				</InputAdornment>
			}}
		></TextField>
	);
};

export default SearchBar;
