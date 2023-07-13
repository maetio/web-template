"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "utils/schemas";
import { sendPasswordlessLoginEmail } from "auth/client";
import { UniversalCookies } from "config/client";

export /**
 * Enter email form
 *
 * @return {*}
 */
const AuthEmailForm: React.FC<{ redirectURL?: string }> = ({ redirectURL }) => {
	// useForm & useAuth initialization
	const { register, handleSubmit } = useForm<{ email: string }>({
		resolver: yupResolver(emailSchema),
	});

	// state used to detect if email sent
	const [sentEmail, setSentEmail] = useState(false);

	// submit email form
	const submitEmail = async (data: { email: string }) => {
		await sendPasswordlessLoginEmail(data.email, redirectURL);
		// localStorage.setItem("email", data.email);
		UniversalCookies.set("email", data.email, { path: "/" });
		setSentEmail(true);
	};

	return (
		<div className="flex max-h-full max-w-full items-center">
			<div className="inline-block h-40 items-center justify-center bg-lightGray">
				<form
					onSubmit={handleSubmit(submitEmail)}
					className="flex items-center gap-2"
				>
					<input
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...register("email")}
						required
						type="text"
						name="email"
						className="w-50 flex-grow rounded-lg border p-1 text-2xl"
						placeholder="Enter Email"
						autoFocus
					/>
					{sentEmail ? (
						<div>Sent!</div>
					) : (
						<button
							type="submit"
							className="mr-4 mt-4 max-w-xs rounded-2xl border-2 border-solid border-black bg-primaryMain p-2 text-xl text-black hover:cursor-pointer hover:bg-primaryMainLight"
						>
							Send Magic Link
						</button>
					)}
				</form>
			</div>
		</div>
	);
};
