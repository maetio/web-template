import { Typography, Box } from "@mui/material";
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
 */ const PageHeader = (props: PageHeaderProps) => (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static">
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	</Box>
);
