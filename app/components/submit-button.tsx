import { Button } from "@mui/material";
import React from "react";

type SubmitButtonProps = {
    title: string
}

const SubmitButton = (props: SubmitButtonProps) => {
	return (
		<Button variant="contained" sx={{borderRadius: 8}}>{props.title}</Button>
	);
};

export default SubmitButton;