"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema, SignInSchemaType } from "utils/schemas";
import { FormInput } from "app/components/forms/form-input";
import { useRouter } from "next/navigation";
import { signInWithEmailPassword } from "auth/client";
import { SignupFormParams } from "./signup-form";

export /**
 * Form for login screen
 *
 * @param {*} { redirectURL }
 * @return {*}
 */
const LoginForm: React.FC<SignupFormParams> = ({ redirectURL }) => {
	// react hook form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(signInSchema),
	});

	// get router
	const router = useRouter();

	// handle the signIn
	const handleSignIn = async (data: SignInSchemaType) => {
		const userCredential = await signInWithEmailPassword(
			data.email,
			data.password,
			false
		);
		// route to new page
		if (userCredential.user) router.push(redirectURL || "/");
		else router.push("/profile");
		reset();
	};

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
				<FormInput
					label="Email Address"
					type="email"
					name="email"
					register={register}
					placeholder="example@domain.com"
					errorMessage={errors.email?.message}
				/>

				<FormInput
					label="Password"
					type="password"
					name="password"
					register={register}
					placeholder="password"
					errorMessage={errors.password?.message}
					forgotPasswordLink={"/login/forgot-password"}
				/>

				<div>
					<button
						type="submit"
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
};
