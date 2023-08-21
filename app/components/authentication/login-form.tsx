"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema, SignInSchemaType } from "utils/schemas";
import { FormInput } from "app/components/forms/form-input";
import { useRouter } from "next/navigation";
import { signInWithEmailPassword } from "auth/client";
import { useCreateFirestoreHook } from "utils/hook-template";
import { SignupFormParams } from "app/components/authentication/signup-form";
import { ActionButton } from "app/components/action-button";

export /**
 * Form for login screen
 *
 * @param {*} { redirectURL }
 * @return {*}
 */
const LoginForm: React.FC<SignupFormParams> = ({
	redirectURL,
	defaultEmail,
	changeEmail,
}) => {
	// react hook form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(signInSchema),
		defaultValues: {
			email: defaultEmail,
		},
	});

	// get router
	const router = useRouter();

	const handleForgetPassword = () => {
		router.push("/login/forgot-password");
	};

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

	const [{ error, isLoading }, updateData] =
		useCreateFirestoreHook(handleSignIn);

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(updateData)} className="space-y-3">
				<FormInput
					label="Email Address"
					labelClassName="block text-sm font-bold leading-6 text-gray-900"
					disabled
					type="email"
					name="email"
					register={register}
					placeholder="example@domain.com"
					errorMessage={errors.email?.message}
					labelButtonText="Change Email"
					labelButtonAction={changeEmail && (() => changeEmail())}
				/>

				<FormInput
					label="Password"
					labelClassName="block text-sm font-bold leading-6 text-gray-900"
					type="password"
					name="password"
					register={register}
					placeholder="password"
					errorMessage={errors.password?.message}
					labelButtonText="Forgot Password"
					labelButtonAction={handleForgetPassword}
				/>

				<div>
					<ActionButton
						className="flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						title="Sign in"
						colorVariant="indigo"
						isLoading={isLoading}
					/>
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
