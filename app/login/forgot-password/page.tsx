"use client";

import { useState } from "react";
import { sendForgotPasswordEmail } from "auth/client";

/**
 * forget password screen, basic screen to send email to user to recover their password
 *
 * @return {*}
 */
function ForgotPassword() {
	const [email, setEmail] = useState<string>();
	const [sent, setSent] = useState(false);
	const handleForget = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSent(true);
		if (email) await sendForgotPasswordEmail(email);
	};

	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				{sent && email ? (
					<>
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Email Sent
						</h1>
						<p className="mt-6 text-base leading-7 text-gray-600">
							We have sent an email to: {email}
						</p>
					</>
				) : (
					<>
						<p>Send Email to recover password</p>
						<form onSubmit={handleForget}>
							<div className="relative mt-2 flex rounded-md shadow-sm">
								<input
									onChange={(e) => setEmail(e.target.value)}
									type="email"
									placeholder="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									aria-invalid="true"
									aria-describedby="email-error"
								/>
								<button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
									Submit
								</button>
							</div>
						</form>
					</>
				)}

				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/login"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Go Back
					</a>
				</div>
			</div>
		</main>
	);
}

export default ForgotPassword;
