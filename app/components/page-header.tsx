import { CheckBox, Sports } from "@mui/icons-material";
import { Grid, Typography, Divider, Box } from "@mui/material";
import React from "react";

export interface PageHeaderProps {
	title: string;
}

export /** 
 * Reusable page header
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 * 
*/  const PageHeader = (props: PageHeaderProps) => (
	<Box
		justifyContent="center"
		alignItems={"center"}
		sx={{
			display: "flex",
			textAlign: "center",
			backgroundColor: "#4f46e5",
			border: 1,
			borderRadius: 1,
			borderColor: "#4f46e5"
		}}
	>
		<Typography
			fontFamily={["Nunito", "sans-serif"]}
			color="white"
			variant="h5"
			fontWeight="800"
		>
			{props.title}
		</Typography>
	</Box>
);
