"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	UpdateUserPasswordSchemaType,
	updateUserPasswordSchema,
} from "utils/schemas";
import { FormInput } from "app/components/forms/form-input";
import { updateUserPassword } from "auth/client";
import { useAuthContext } from "auth/auth-context-provider";

export /**
 * form that allows users to update thier password
 *
 * @param {*}
 * @return {*}
 */
const UpdatePasswordForm: React.FC<{}> = () => {
	// get user
	const userData = useAuthContext();

	// react hook form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(updateUserPasswordSchema),
		defaultValues: {
			email: userData?.email || "",
		},
	});

	const handleSignIn = async (data: UpdateUserPasswordSchemaType) => {
		// const userCredential = await signInWithEmailPassword(
		// 	data.email,
		// 	data.password,
		// 	false
		// );

		console.log("data from from", data);
		// route to new page
		// if (userCredential.user) router.push(redirectURL || "/");
		// else router.push("/profile");
		reset();
	};

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
				<>
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
					/>

					<FormInput
						label="Password"
						type="password"
						name="newPassword"
						register={register}
						placeholder="password"
						errorMessage={errors.newPassword?.message}
					/>
				</>

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
