import { MaetIcon } from "app/components/icons";
import { Typography, Box, AppBar, Toolbar } from "app/components/providers/mui-server-components";
import React from "react";

export interface PageHeaderProps {
	title?: string;
}

export /**
 * Reusable page header
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 *
 */ const PageHeader = () => (
	<Box sx={{ flexGrow: 1, border: 1, borderColor: "#E5E5E5" }}>
		<AppBar position="static" sx={{backgroundColor: "#FFFFFF"}}>
			<Toolbar>
				<MaetIcon color="primary"/>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#818CF8", ml: 2}}>
            Maet
				</Typography>
			</Toolbar>
		</AppBar>
	</Box>
);

export default PageHeader;