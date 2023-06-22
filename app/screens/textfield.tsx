"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

type TextFieldProps = {};

export /**
 * Reusable text field for user inputs
 * 
 * @param {TextFieldProps} props 
 * @returns 
 */
const  TextField = (props: TextFieldProps) => {
	return(
		<Box sx={{backgroundColor: "#FAFAFA", border: 1, borderColor: "#D9D9D9", borderRadius: 15}}>
			<Typography>Input Field</Typography>
		</Box>
	) ;
};