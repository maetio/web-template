import React from "react";
import { Typography, Grid, TextField, FormControl, Input, OutlinedInput, InputLabel } from "../mui-server-components";

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
		<TextField label={props.label || "Input Field"} sx={{ mt: 2, ml: 2, backgroundColor: "FAFAFA", borderColor: "#D9D9D9" }}></TextField>
	);
};

export default InputField;