import React from "react";
import { Search } from "@mui/icons-material";
import {
	Typography,
	Grid,
	TextField,
	FormControl,
	Input,
	OutlinedInput,
	InputLabel,
	InputAdornment,
} from "../../providers/mui-server-components";

interface InputFieldProps {
	label: string;
}

export /**
 * Reusable text field for user inputs
 *
 * @param {TextFieldProps}
 * @returns
 */
const InputField: React.FC<InputFieldProps> = ({label}) => {
	return (
		<TextField
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
