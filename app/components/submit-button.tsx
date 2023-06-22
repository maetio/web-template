import { Button } from "@mui/material";
import React from "react";

export interface SubmitButtonProps {
    title: string;
    color: string;
}

export const SubmitButton = (props: SubmitButtonProps) => {
	return (
		<Button variant="contained" sx={{borderRadius: 8, backgroundColor: props.color, width: 300, fontFamily: "Nunito"}}>{props.title}</Button>
	);
};
