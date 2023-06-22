import { Box, Typography } from "@mui/material";
import { M_PLUS_1 } from "next/font/google";
import React from "react";

type Props = {};

export const TextField = (props: Props) => {
	return(
		<Box sx={{backgroundColor: "#FAFAFA", border: 1, borderColor: "#D9D9D9", borderRadius: 15}}>
			<Typography>Input Field</Typography>
		</Box>
	) ;
};
