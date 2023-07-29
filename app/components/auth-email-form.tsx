"use client";

import React from "react";
import { signInAsGuest, signInWithFacebook, signInWithGoogle } from "auth/client";
import { ActionButton } from "app/components/action-button";
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

	const googleSignIn = async () => {
		const userCredential = await signInWithGoogle();
		// route to new page
		if (userCredential.user.displayName?.length)
			router.push(redirectURL || "/");
		else router.push("/profile");
	};

	const facebookSignIn = async () => {
		const userCredential = await signInWithFacebook();
		// route to new page
		if (userCredential.user.displayName?.length)
			router.push(redirectURL || "/");
		else router.push("/profile");
	};

	const signInGuest = async () => {
		const userCredential = await signInAsGuest();
		// route to new page
		if (userCredential.user.displayName?.length)
			router.push(redirectURL || "/");
		else router.push("/profile");
	};

	return (
		<>
			<div className="flex h-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="align-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
					<MaetIcon
						size={20}
						className="align-center mx-auto w-20 justify-center"
					/>
					<h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Welcome to Maet!
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<ActionButton
						className="my-4 w-full"
						startIcon="google"
						action={googleSignIn}
						title="Continue with Google"
					/>
					<ActionButton
						className="my-4 w-full"
						startIcon="facebook"
						action={facebookSignIn}
						title="Continue with Facebook"
					/>
					<ActionButton
						className="my-4 w-full"
						action={signInGuest}
						title="Continue as Guest"
					/>
					{/* <ActionButton
						className="w-full my-4"
						title="Use Email and Password"
						referRoute="/create-account"
					/> */}
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
