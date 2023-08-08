"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema, SignInSchemaType } from "utils/schemas";
import { FormInput } from "app/components/forms/form-input";
import { useRouter } from "next/navigation";
import { signInWithEmailPassword } from "auth/client";
import { useCreateFirestoreHook } from "utils/hook-template";
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
		try {
			const userCredential = await signInWithEmailPassword(
				data.email,
				data.password,
				false
			);
			// route to new page
			if (userCredential.user) router.push(redirectURL || "/");
			else router.push("/profile");
			reset();
		} catch (e: any) {
			throw Error(e);
		}
	};

	const [{ isLoading, error }, updateData] =
		useCreateFirestoreHook(handleSignIn);

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(updateData)} className="space-y-6">
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
						disabled={isLoading}
						type="submit"
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Sign in
					</button>
				</div>
				{error ? (
					<div className="mt-10">
						<text className="font-bold text-red-600">{error}</text>
					</div>
				) : null}
			</form>
		</div>
	);
};
