import React from "react";
import { Search } from "@mui/icons-material";
import { Typography, Grid, TextField, FormControl, Input, OutlinedInput, InputLabel, InputAdornment } from "../mui-server-components";

type TextFieldProps = {
	label: string;
};

export /**
 * Reusable text field for user inputs
 * 
 * @param {TextFieldProps} props 
 * @returns 
 */
const InputField = (props: TextFieldProps) => {
	return(
		<TextField 
			label={props.label || "Input Field"} 
			sx={{ fieldset: { border: 1, borderRadius: 2,  borderColor: "#D9D9D9" }, mt: 2, ml: 2, backgroundColor: "#f5f5f5" }}
			InputProps={{
				startAdornment: <InputAdornment position="end">
					<Search></Search>
				</InputAdornment>
			}}
		></TextField>
	);
};

export default InputField;