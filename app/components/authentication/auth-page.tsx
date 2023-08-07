"use client";

import React, { useState } from "react";
import { BaseURL } from "config/constants";
import {
	LoginProvidersForm,
	LoginForm,
	SignupForm,
} from "app/components/authentication";
import { MaetIcon } from "app/components/icons";
import { ActionButton } from "app/components/action-button";

export /**
 * the entire auth page in a client side component.
 * has redirect url that can be passed in to allow for users to login and navigate back to a certain screen
 *
 * @param {*} {
 * 	redirectURL,
 * }
 * @return {*}
 */
const AuthPageComp: React.FC<{ redirectURL?: string }> = ({ redirectURL }) => {
	// state that dicates if we show the password login section
	const [passwordLogin, setPasswordLogin] = useState(false);
	// switch between the login and signup password component
	const [signUp, setSignUp] = useState(false);

	// set the url to refer back after email sign in
	const referringURL =
		document.referrer.startsWith(BaseURL) &&
		!document.referrer.endsWith("login")
			? document.referrer
			: undefined;

	return (
		<div className="flex min-h-[75vh]">
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<MaetIcon
						size={20}
						className="align-center mx-auto w-20 justify-center"
					/>
					<h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Welcome to Maet!
					</h2>
				</div>
				{passwordLogin ? (
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
				) : null}
				{/* continue with section */}
				<div className=" sm:mx-auto sm:w-full sm:max-w-sm">
					<section className="relative mt-10">
						<div
							className="absolute inset-0 flex items-center"
							aria-hidden="true"
						>
							<div className="w-full border-t border-gray-200" />
						</div>
						<div className="relative flex justify-center text-sm font-medium leading-6">
							<span className="bg-white px-6 text-gray-900">
								continue with
							</span>
						</div>
					</section>
					<LoginProvidersForm
						containerParams="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
						redirectURL={redirectURL || referringURL}
						providers={["facebook", "google", "guest"]}
					/>

					{passwordLogin ? null : (
						<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
							<ActionButton
								className="sm:mx-auto sm:w-full sm:max-w-sm"
								title="Use Email and Password"
								action={async () => {
									setPasswordLogin(!passwordLogin);
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
