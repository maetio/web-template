"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema, signInSchema } from "utils/schemas";
import { FormInput } from "app/components/forms/form-input";

export const AuthPasswordForm = () => {
	const [signUp, setSignUp] = useState(false);

	const schema = signUp ? signupSchema : signInSchema;

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const handleSignIn = (data: any) => {
		reset();
		console.log("sign in", data);
	};

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
				<FormInput />
				{signUp ? (
					<>
						<div>
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								First Name
							</label>
							<div className="mt-2">
								<input
									{...register("firstName")}
									id="firstName"
									name="firstName"
									type="firstName"
									autoComplete="firstName"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Last Name
							</label>
							<div className="mt-2">
								<input
									id="lastName"
									name="lastName"
									type="text"
									autoComplete="lastName"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</>
				) : null}
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Email address
					</label>
					<div className="mt-2">
						<input
							{...register("email")}
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label
							htmlFor="password"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Password
						</label>
						{signUp ? null : (
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						)}
					</div>
					<div className="mt-2">
						<input
							{...register("password")}
							id="password"
							name="password"
							type="password"
							autoComplete="password"
							required
							className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				{signUp ? (
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Repeat Password
							</label>
						</div>
						<div className="mt-2">
							<input
								{...register("confirmPassword")}
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								autoComplete="confirmPassword"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				) : null}

				<div>
					{/* <button
						type="submit"
						onClick={() => console.log("somethibng")}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign in
					</button> */}
				</div>
				<input type="submit" />
			</form>

			<p className="mt-10 text-center text-sm text-gray-500">
				{signUp ? "Already a user" : "Not a member?"}{" "}
				<button
					onClick={() => setSignUp(!signUp)}
					className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>
					{signUp ? "Login here" : "Sign up here!"}
				</button>
			</p>
		</div>
	);
};
