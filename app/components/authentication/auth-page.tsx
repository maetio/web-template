"use client";

import React from "react";
import { BaseURL } from "config/constants";
import {
	LoginProvidersForm,
	// LoginForm,
	// SignupForm,
} from "app/components/authentication";
import { MaetIcon } from "app/components/icons";
// import { ActionButton } from "app/components/action-button";
import { FormInput } from "app/components/forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "utils/schemas";
import { ActionButton } from "../action-button";
import { NextImage } from "../image";

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
	// state that dicates if we show the password login section
	// const [passwordLogin, setPasswordLogin] = useState(false);
	// switch between the login and signup password component
	// const [signUp, setSignUp] = useState(false);

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
	const referringURL =
		document.referrer.startsWith(BaseURL) &&
		!document.referrer.endsWith("login")
			? document.referrer
			: undefined;

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
				{/* {passwordLogin ? (
					<>
						{signUp ? (
							<SignupForm
								redirectURL={redirectURL || referringURL}
							/>
						) : (
							<LoginForm
								redirectURL={redirectURL || referringURL}
							/>
						)}

						<p className="mt-10 text-center text-sm text-gray-500">
							{signUp ? "Already a user" : "Not a member?"}{" "}
							<button
								onClick={() => setSignUp(!signUp)}
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>
								{signUp ? "Login here" : "Sign up here!"}
							</button>
						</p>
					</>
				) : null} */}
				<div className=" sm:mx-auto sm:w-full sm:max-w-sm">
					<LoginProvidersForm
						containerParams="mt-4 mb-6 sm:mx-auto sm:w-full sm:max-w-sm"
						buttonParams="p-2.5 mt-3 w-full shadow-none hover:shadow-md bg-white rounded-xl border border-neutral-400"
						redirectURL={redirectURL || referringURL}
						providers={["google", "facebook"]}
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
							<span className="bg-white px-6 text-gray-900">
								Or
							</span>
						</div>
					</section>
					{/* old password login */}
					{/* {passwordLogin ? null : (
						<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
							<ActionButton
								className="sm:mx-auto sm:w-full sm:max-w-sm"
								title="Use Email and Password"
								action={async () => {
									setPasswordLogin(!passwordLogin);
								}}
							/>
						</div>
					)} */}

					<FormInput
						register={register}
						name="email"
						label="Enter Email"
						labelClassName="block text-sm font-bold leading-6 text-gray-900"
						placeholder="name@example.com"
						type="email"
						errorMessage={errors.email?.message}
					/>

					<div>
						<ActionButton
							className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							title="Continue"
							colorVariant="indigo"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
