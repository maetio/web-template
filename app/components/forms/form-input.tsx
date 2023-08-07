import { UseFormRegister } from "react-hook-form";
import { PiWarningCircleFill } from "react-icons/pi";

interface FormInputParams {
	register: UseFormRegister<any>; // tried using FieldVales instead of any, and was still getting a TS error
	label?: string;
	name: string; // register name
	type: "email" | "text" | "password";
	errorMessage?: string | undefined;
	defaultValue?: string;
	placeholder?: string;
	disabled?: boolean;
}

export /**
 * prebuild form input component that handles the error message and form validation from react-hook form
 *
 * @param {*} {
 * 	register,
 * 	label,
 * 	name,
 * 	type,
 * 	errorMessage,
 * 	defaultValue,
 * 	placeholder,
 *  disabled
 * }
 * @return {*}
 */
const FormInput: React.FC<FormInputParams> = ({
	register,
	label,
	name,
	type,
	errorMessage,
	defaultValue,
	placeholder,
	disabled,
}) => {
	return (
		<div>
			<label
				htmlFor="email"
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					{...register(name)}
					disabled={disabled}
					type={type}
					name={name}
					id={name}
					// className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder={placeholder}
					defaultValue={defaultValue}
					aria-invalid="true"
					aria-describedby="email-error"
				/>
				{errorMessage && (
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<PiWarningCircleFill
							className="h-5 w-5 text-red-500"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>
			{errorMessage && (
				<p className="mt-2 text-sm text-red-600" id="email-error">
					{errorMessage}
				</p>
			)}
		</div>
	);
};

FormInput.defaultProps = {
	label: undefined,
	type: "text",
	errorMessage: undefined,
	defaultValue: undefined,
	placeholder: undefined,
	disabled: false,
};
