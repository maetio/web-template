"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema, SignupSchemaType } from "utils/schemas";
import { FormInput } from "app/components/forms/form-input";
import { signInWithEmailPassword } from "auth/client";
import { useRouter } from "next/navigation";
import { useCreateFirestoreHook } from "utils/hook-template";
import { ActionButton } from "app/components/action-button";

export interface SignupFormParams {
	redirectURL?: string;
	defaultEmail?: string;
}

export /**
 * form for signup screen
 *
 * @param {*} { redirectURL }
 * @return {*}
 */
const SignupForm: React.FC<SignupFormParams> = ({
	redirectURL,
	defaultEmail,
}) => {
	// react hook form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(signupSchema),
		defaultValues: {
			email: defaultEmail,
		},
	});

	// get router
	const router = useRouter();

	// handle signup
	const handleSignup = async (data: SignupSchemaType) => {
		console.log("fired");
		const userCredential = await signInWithEmailPassword(
			data.email,
			data.password,
			true,
			data.firstName,
			data.lastName
		);

		// route to new page
		if (userCredential.user) router.push(redirectURL || "/");
		else router.push("/profile");
		reset();
	};

	const [{ error, isLoading }, updateData] =
		useCreateFirestoreHook(handleSignup);

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(updateData)} className="space-y-6">
				<FormInput
					label="Email Address"
					type="email"
					name="email"
					disabled
					register={register}
					placeholder="example@domain.com"
					errorMessage={errors.email?.message}
					labelButtonText="Change Email"
					// labelButtonAction={}
				/>

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
					label="Password"
					type="password"
					name="password"
					register={register}
					placeholder="password"
					errorMessage={errors.password?.message}
				/>

				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					register={register}
					placeholder="re-enter password"
					errorMessage={errors.confirmPassword?.message}
				/>

				<div>
					<ActionButton
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						title="Sign Up"
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
