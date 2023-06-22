import { Button } from "@mui/material";
import React from "react";

export interface SubmitButtonProps {
	title: string;
	color: string;
}

export /**
 * Submit button for all form screens
 * 
 * @param {SubmitButtonProps} props 
 * @returns 
 */
const  SubmitButton = (props: SubmitButtonProps) => {
	return (
		<Button
			variant="contained"
			sx={{ borderRadius: 8, backgroundColor: props.color, width: 300 }}
		>
			{props.title}
		</Button>
	);
};
