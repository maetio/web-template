"use client";

import React from "react";
import { Button, ButtonTypeMap, ExtendButtonBase } from "../../providers/mui-server-components";

export interface SubmitButtonProps {
	color: string;
	title: string;
}
export /**
 * Submit button for all form screens
 *
 * @param {SubmitButtonProps}
 * @returns
 */
const SubmitButton: React.FC<SubmitButtonProps> = ({title, color, ...props}) => {
	return (
		<Button
			{...props}
			variant="contained"
			sx={{
				borderRadius: 8,
				backgroundColor: color,
				width: 480,
				height: 50,
			}}
			type="submit"
		>
			{title}
		</Button>
	);
};

export default SubmitButton;
