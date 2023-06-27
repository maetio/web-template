import React from "react";
import { Button } from "../../providers/mui-server-components";

export interface SubmitButtonProps {
	title: string;
	color: string;
}

export /**
 * Submit button for all form screens
 *
 * @param {SubmitButtonProps}
 * @returns
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({title, color}) => {
	return (
		<Button
			variant="contained"
			sx={{
				borderRadius: 8,
				backgroundColor: color,
				width: 480,
				height: 50,
			}}
		>
			{title}
		</Button>
	);
};

export default SubmitButton;
