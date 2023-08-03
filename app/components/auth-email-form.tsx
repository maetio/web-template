"use client";

import React from "react";
import {
	signInAsGuest,
	signInWithFacebook,
	signInWithGoogle,
} from "auth/client";
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

	// const facebookSignIn = async () => {
	// 	const userCredential = await signInWithFacebook();
	// 	// route to new page
	// 	if (userCredential.user.displayName?.length)
	// 		router.push(redirectURL || "/");
	// 	else router.push("/profile");
	// };

	const signInGuest = async () => {
		const userCredential = await signInAsGuest();
		// route to new page
		if (userCredential.user.displayName?.length)
			router.push(redirectURL || "/");
		else router.push("/profile");
	};

	return (
		<>
			<div className="mt-6 grid grid-cols-2 gap-4">
				<ActionButton
					className="my-4 w-full"
					startIcon="google"
					action={googleSignIn}
					title="Google"
				/>
				<ActionButton
					className="my-4 w-full"
					// startIcon="person"
					action={signInGuest}
					title="Guest"
				/>
			</div>
		</>
	);
};
