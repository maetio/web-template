"use client";

import React, { InputHTMLAttributes } from "react";
import { Search } from "@mui/icons-material";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { TextField , TextFieldProps, TextFieldVariants} from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "variant"> {
	id: string;
	label: string;
	register?: UseFormRegister<FieldValues>;
}

export /**
 * Reusable text field for user inputs
 *
 * @param {InputFieldProps}
 * @returns
 */
const InputField: React.FC<InputFieldProps> = ({
	label,
	id,
	register,
	sx,
	...props
}) => {
	return (
		<TextField
			{...props}
			label={label}
			id={id}
			type="text"
			{...(register && register(id))}
			sx={{
				fieldset: {
					border: 1,
					borderRadius: 3,
					borderColor: "#D9D9D9",
				},
				mt: 2,
				mb: 2,
				backgroundColor: "#f5f5f5",
				width: 480,
				borderRadius: 3,
				...sx,
			}}

		></TextField>
	);
};

export default InputField;
