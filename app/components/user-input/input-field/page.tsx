"use client";

import React, { InputHTMLAttributes } from "react";
import { Search } from "@mui/icons-material";
import {
	TextField,
} from "../../providers/mui-server-components";

interface InputFieldProps {
	label: string,
}

export /**
 * Reusable text field for user inputs
 *
 * @param {TextFieldProps}
 * @returns
 */
const InputField: React.FC<InputFieldProps> = (label, {...props}) => {
	return (
		<TextField
			{...props}
			label={label || "Input Field"}
			sx={{
				fieldset: {
					border: 1,
					borderRadius: 3,
					borderColor: "#D9D9D9",
				},
				mt: 2,
				ml: 2,
				mb: 2,
				backgroundColor: "#f5f5f5",
				width: 480,
				borderRadius: 3,
			}}
		></TextField>
	);
};

export default InputField;
