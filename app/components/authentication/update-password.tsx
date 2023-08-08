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
import { useCreateFirestoreHook } from "utils/hook-template";
import { ActionButton } from "app/components/action-button";

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

	const handleUpdatePassword = async (data: UpdateUserPasswordSchemaType) => {
		await updateUserPassword(data.email, data.password, data.newPassword);
		reset();
	};

	const [{ error }, updateData] =
		useCreateFirestoreHook(handleUpdatePassword);

	return (
		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form onSubmit={handleSubmit(updateData)} className="space-y-6">
				<FormInput
					disabled
					label="Email Address"
					type="email"
					name="email"
					register={register}
					placeholder="example@domain.com"
					errorMessage={errors.email?.message}
				/>

				<FormInput
					label="Old Password"
					type="password"
					name="password"
					register={register}
					placeholder="Password"
					errorMessage={errors.password?.message}
				/>

				<FormInput
					label="New Password"
					type="password"
					name="newPassword"
					register={register}
					placeholder="New Password"
					errorMessage={errors.newPassword?.message}
				/>

				<div>
					<ActionButton
						className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						title="Change Password"
						colorVariant="indigo"
						action={handleSubmit(updateData)}
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
