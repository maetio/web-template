import { TextField } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {};

const JoinTeam = (props: Props) => {
	return (
		<div>
			<h1>Join Team</h1>
			<div>
				<label>Enter Passcode to Join Team: </label>
				<input type="text"></input>
			</div>
			<Link href="/screens/team-registration/success">Success</Link>
		</div>
	);
};

export default JoinTeam;
