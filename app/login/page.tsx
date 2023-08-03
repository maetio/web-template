"use client";

import React, { useState } from "react";
import { BaseURL } from "config/constants";
import { AuthEmailForm } from "app/components/auth-email-form";
import { MaetIcon } from "app/components/icons";

export /**
 * Enter email form
 *
 * @return {*}
 */
const LoginPage: React.FC<{}> = () => {
	const [signUp, setSignUp] = useState(false);

	// set the url to refer back after email sign in
	const referringURL =
		document.referrer.startsWith(BaseURL) &&
		!document.referrer.endsWith("login")
			? document.referrer
			: undefined;

	return (
		<>
			{/*
		  This example requires updating your template:
  
		  ```
		  <html class="h-full bg-gray-50">
		  <body class="h-full">
		  ```
		*/}
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<MaetIcon
						size={20}
						className="align-center mx-auto w-20 justify-center"
					/>
					<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6" action="#" method="POST">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							{signUp ? (
								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Repeat Password
									</label>
									<div className="mt-2">
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							) : null}

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
									<label
										htmlFor="remember-me"
										className="ml-3 block text-sm leading-6 text-gray-900"
									>
										Remember me
									</label>
								</div>

								<div className="text-sm leading-6">
									<a
										href="#"
										className="font-semibold text-indigo-600 hover:text-indigo-500"
									>
										Forgot password?
									</a>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Sign in
								</button>
							</div>
						</form>

						<div>
							<div className="relative mt-10">
								<div
									className="absolute inset-0 flex items-center"
									aria-hidden="true"
								>
									<div className="w-full border-t border-gray-200" />
								</div>
								<div className="relative flex justify-center text-sm font-medium leading-6">
									<span className="bg-white px-6 text-gray-900">
										Or continue with
									</span>
								</div>
							</div>

							<AuthEmailForm redirectURL={referringURL} />
						</div>
					</div>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{" "}
						<button
							onClick={() => {
								setSignUp(!signUp);
							}}
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							{signUp ? "Login" : "Sign Up"}
						</button>
					</p>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
