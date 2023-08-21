"use client";

import React, { useState } from "react";
// import { BaseURL } from "config/constants";
import {
	LoginProvidersForm,
	LoginForm,
	SignupForm,
} from "app/components/authentication";
import { MaetIcon } from "app/components/icons";
// import { ActionButton } from "app/components/action-button";
import { FormInput } from "app/components/forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmailSchemaType, emailSchema } from "utils/schemas";
import { fetchSignInMethods } from "auth/client";
import { ActionButton } from "app/components/action-button";
import { NextImage } from "app/components/image";
import { useCreateFirestoreHook } from "utils/hook-template";

interface AuthPageCompParams {
	redirectURL?: string;
	image?: string;
	header?: string;
}

export /**
 * the entire auth page in a client side component.
 * has redirect url that can be passed in to allow for users to login and navigate back to a certain screen
 *
 * @param {*} {
 * 	redirectURL,
 * }
 * @return {*}
 */
const AuthPageComp: React.FC<AuthPageCompParams> = ({
	redirectURL,
	image,
	header,
}) => {
	const [userStatus, setUserStatus] = useState<
		"passwordAccont" | "noAccount" | undefined
	>();

	console.log(redirectURL);

	const [defaultEmail, setDefaultEmail] = useState<string>();

	// react hook form
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(emailSchema),
	});

	// set the url to refer back after email sign in
	// const referringURL =
	// 	document.referrer.startsWith(BaseURL) &&
	// 	!document.referrer.endsWith("login")
	// 		? document.referrer
	// 		: undefined;

	// change email function
	const changeEmail = () => {
		setUserStatus(undefined);
		setDefaultEmail(undefined);
	};

	// handle the signIn
	const handleSignIn = async (data: EmailSchemaType) => {
		try {
			const methods = await fetchSignInMethods(data.email);
			if (methods.length && !methods.includes("password")) {
				throw Error(
					"Looks like you have logged in with one of our authentication providers(google, facebook)in the past. Please sign in with the appropriate provider"
				);
			} else if (methods.includes("password")) {
				setUserStatus("passwordAccont");
				setDefaultEmail(data.email);
			} else {
				setUserStatus("noAccount");
				setDefaultEmail(data.email);
			}
			console.log("sign in methods", methods);
			reset();
		} catch (e: any) {
			throw Error(e);
		}
	};

	const [{ error, isLoading }, updateData] =
		useCreateFirestoreHook(handleSignIn);

	return (
		<div className="flex">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					{image ? (
						<NextImage
							className="align-center mx-auto justify-center rounded-xl"
							size={100}
							src={image}
							alt="competition banner"
						/>
					) : (
						<MaetIcon
							size={20}
							className="align-center mx-auto w-20 justify-center"
						/>
					)}

					<h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						{header || "Welcome to Maet!"}
					</h2>
					<p className="mt-5 text-center text-sm">
						{image
							? "Register with you Maet profile"
							: "Login or Signup"}
					</p>
				</div>
				<div className=" sm:mx-auto sm:w-full sm:max-w-sm">
					<LoginProvidersForm
						containerParams="mt-4 mb-6 sm:mx-auto sm:w-full sm:max-w-sm"
						buttonParams="bg-red-200 p-2.5 mt-3 w-full shadow-none hover:shadow-md hover:bg-gray-200 rounded-xl border border-neutral-400"
						// redirectURL={redirectURL || referringURL}
						redirectURL={redirectURL}
						providers={["google"]}
					/>
					{/* or section */}
					<section className="relative mb-6">
						<div
							className="absolute inset-0 flex items-center"
							aria-hidden="true"
						>
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center text-sm font-medium leading-6">
							<span className="bg-gray-100 px-6 text-gray-900">
								Or
							</span>
						</div>
					</section>

					<form onSubmit={handleSubmit(updateData)}>
						{!userStatus && (
							<>
								<FormInput
									register={register}
									inputClassName="bg-gray-100"
									name="email"
									label="Enter Email"
									labelClassName="block text-sm font-bold leading-6 text-gray-900"
									placeholder="name@example.com"
									type="email"
									errorMessage={errors.email?.message}
								/>

								<ActionButton
									className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									title="Continue"
									colorVariant="indigo"
									isLoading={isLoading}
								/>
							</>
						)}
					</form>

					{userStatus === "passwordAccont" && (
						<LoginForm
							// redirectURL={redirectURL || referringURL}
							redirectURL={redirectURL}
							changeEmail={changeEmail}
							defaultEmail={defaultEmail}
						/>
					)}
					{userStatus === "noAccount" && (
						<SignupForm
							redirectURL={redirectURL}
							// redirectURL={redirectURL || referringURL}

							changeEmail={changeEmail}
							defaultEmail={defaultEmail}
						/>
					)}

					{error && (
						<p className="mt-4 font-bold text-red-500">{error}</p>
					)}
				</div>
			</div>
		</div>
	);
};
