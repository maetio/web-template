"use client";

import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { Search } from "@mui/icons-material";
import { FieldValues, UseFormRegister } from "react-hook-form";
import {
	TextField,
	TextFieldVariants,
} from "../../providers/mui-server-components";

interface InputFieldProps {
	id: string;
	label: string;
	register?: UseFormRegister<FieldValues>;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
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
	onChange,
	...props
}) => {
	return (
		<TextField
			autoComplete="off"
			{...props}
			onChange={onChange}
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
				ml: 2,
				mb: 2,
				backgroundColor: "#f5f5f5",
				width: 480,
				borderRadius: 3,
			}}
		/>
	);
};

export default InputField;
