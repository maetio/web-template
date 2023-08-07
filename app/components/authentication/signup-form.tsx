"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema, SignupSchemaType } from "utils/schemas";
import { FormInput } from "app/components/forms/form-input";
import { signInWithEmailPassword } from "auth/client";
import { useRouter } from "next/navigation";

export interface SignupFormParams {
	redirectURL?: string;
}

export const SignupForm: React.FC<SignupFormParams> = ({ redirectURL }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(signupSchema),
	});

	const router = useRouter();

	const handleSignIn = async (data: SignupSchemaType) => {
		const userCredential = await signInWithEmailPassword(
			data.email,
			data.password,
			true
		);
		// route to new page
		if (userCredential.user.displayName?.length)
			router.push(redirectURL || "/");
		else router.push("/profile");
		console.log("sign in", data);
		reset();
	};
	console.log("rengered");

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
				<FormInput
					label="First Name"
					type="text"
					name="firstName"
					register={register}
					placeholder="John"
					errorMessage={errors.firstName?.message}
				/>

				<FormInput
					label="Last Name"
					type="text"
					name="lastName"
					register={register}
					placeholder="Doe"
					errorMessage={errors.lastName?.message}
				/>

				<FormInput
					label="Email Address"
					type="email"
					name="email"
					register={register}
					placeholder="example@domain.com"
				/>

				<FormInput
					label="Password"
					type="password"
					name="password"
					register={register}
					placeholder="password"
				/>

				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					register={register}
					placeholder="re-enter password"
				/>

				<div>
					<button
						type="submit"
						onClick={() => console.log("somethibng")}
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
};
