import React from "react";
import { Button } from "../mui-server-components";

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
			sx={{ borderRadius: 8, backgroundColor: props.color, width: 480, height: 50}}
		>
			{props.title}
		</Button>
	);
};
