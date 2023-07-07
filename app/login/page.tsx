"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "app/utils/schemas";
import {
	sendPasswordlessLoginEmail,
} from "auth/client";

export /**
 * Enter email form
 *
 * @return {*}
 */
const LoginPage: React.FC<{}> = () => {
	// useForm & useAuth initialization
	const {
		register,
		handleSubmit,
	} = useForm<{ email: string }>({
		resolver: yupResolver(emailSchema),
	});

	// state used to detect if email sent
	const [sentEmail, setSentEmail] = useState(false);

	// submit email form
	const submitEmail = async (data: { email: string }) => {
		console.log("email inputed", data.email);
		await sendPasswordlessLoginEmail(data.email);
		localStorage.setItem("email", data.email);
		setSentEmail(true);
	};

	return (
		<form onSubmit={handleSubmit(submitEmail)} className="flex gap-2 items-center">
			<input
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...register("email")}
				required
				type="text"
				name="email"
				className="text-2xl p-1 rounded-lg flex-grow w-full"
				placeholder="Enter Email"
				autoFocus
			/>
			{sentEmail ?
				<div>Sent!</div> : 			
				<button
					type="submit"
					className="p-2 text-xl rounded-2xl text-black border-solid border-black border-2 max-w-xs bg-green-500 hover:cursor-pointer hover:bg-green-400"
				>
					Send Magic Link
				</button>
			}
		</form>
	);
};

export default LoginPage;
