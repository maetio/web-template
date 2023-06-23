import { Grid, Typography } from "app/components/mui-server-components";
import { SubmitButton } from "app/components/submit-button/page";
import React from "react";

type Props = {}

const JoinTeam = (props: Props) => {
	return (
		<Grid 
			sx={{height: "100vh", backgroundColor: "#D9D9D9"}}
			container
			alignItems="center"
			justifyContent="center"
		>
			<Grid 
				sx={{width: 1000, height: 800, border: 1, borderColor: "#FAFAFA", borderRadius: 30, backgroundColor: "#FAFAFA"}}
				container
			>
				<Grid 
					container
					direction="column"
					alignItems="center"
				>
					<Typography 
						variant="h2" 
						sx={{fontWeight: 700}}
					>
                        Team Name
					</Typography>
					<Typography>
                        Contact the team captain for the team passcode
					</Typography>
					<SubmitButton title="Join Team" color="#818CF8"></SubmitButton>   
				</Grid>
			</Grid>
		</Grid>
	);
};

export default JoinTeam;