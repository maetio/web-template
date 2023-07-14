"use client";

import React from "react";
import { signInWithGoogle } from "auth/client";
import { SubmitFormActionButton } from "app/components/submit-form-action-button";
import { useRouter } from "next/navigation";
import { MaetIcon } from "app/components/icons";

export /**
 * Enter email form
 *
 * @return {*}
 */
const AuthEmailForm: React.FC<{ redirectURL?: string }> = ({ redirectURL }) => {
	// useForm & useAuth initialization
	// const { register, handleSubmit } = useForm<{ email: string }>({
	// 	resolver: yupResolver(emailSchema),
	// });

	// // state used to detect if email sent
	// const [sentEmail, setSentEmail] = useState(false);

	// // submit email form
	// const submitEmail = async (data: { email: string }) => {
	// 	await sendPasswordlessLoginEmail(data.email, redirectURL);
	// 	// localStorage.setItem("email", data.email);
	// 	UniversalCookies.set("email", data.email, { path: "/" });
	// 	setSentEmail(true);
	// };
	// get router
	const router = useRouter();

	const onSubmit = async () => {
		const userCredential = await signInWithGoogle();
		// route to new page
		if (userCredential.user.displayName?.length) router.push(redirectURL || "/");
		else router.push("/profile");
	};

	return (
		<>
			<div className="h-full flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm justify-center align-center">
					<MaetIcon size={20} className="mx-auto w-20 align-center justify-center" />
					<h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            			Welcome to Maet!
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<SubmitFormActionButton colorVariant="white" icon="google" action={onSubmit} title="Continue with Google" />
				</div>
			</div>
		</>
		// <div className="flex max-h-full max-w-full items-center">
		// 	<div className="inline-block h-40 items-center justify-center bg-lightGray">
		// 		<SubmitFormActionButton action={onSubmit} title="Sign in with Google" />
		// 		<form
		// 			onSubmit={handleSubmit(submitEmail)}
		// 			className="flex items-center gap-2"
		// 		>
		// 			<input
		// 				// eslint-disable-next-line react/jsx-props-no-spreading
		// 				{...register("email")}
		// 				required
		// 				type="text"
		// 				name="email"
		// 				className="w-50 flex-grow rounded-lg border p-1 text-2xl"
		// 				placeholder="Enter Email"
		// 				autoFocus
		// 			/>
		// 			{sentEmail ? (
		// 				<div>Sent!</div>
		// 			) : (
		// 				<button
		// 					type="submit"
		// 					className="mr-4 mt-4 max-w-xs rounded-2xl border-2 border-solid border-black bg-primaryMain p-2 text-xl text-black hover:cursor-pointer hover:bg-primaryMainLight"
		// 				>
		// 					Send Magic Link
		// 				</button>
		// 			)}
		// 		</form>
		// 	</div>
		// </div>
	);
};
