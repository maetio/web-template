import React from "react";
import { Typography, Grid, TextField } from "../mui-server-components";

type TextFieldProps = {};

export /**
 * Reusable text field for user inputs
 * 
 * @param {TextFieldProps} props 
 * @returns 
 */
const InputField = (props: TextFieldProps) => {
	return(
		<Grid
			container 
			alignItems="center"
			sx={{backgroundColor: "#D9D9D9", border: 1, borderColor: "#D9D9D9", borderRadius: 2, m: 2, height: 70}}>
			<TextField sx={{fontWeight: 700, ml: 2}}>Input Field</TextField>
		</Grid>
	) ;
};

export default InputField;