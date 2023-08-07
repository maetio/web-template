"use client";

import React from "react";
import {
	signInAsGuest,
	signInWithFacebook,
	signInWithGoogle,
} from "auth/client";
import { ActionButton } from "app/components/action-button";
import { useRouter } from "next/navigation";

type Providers = "facebook" | "google" | "guest";

export interface LoginProvidersFormParams {
	redirectURL?: string;
	containerParams: string;
	buttonParams?: string;
	providers: Providers[];
}

export /**
 * Contains auth providers in a customizable format 
 *
 * @return {*}
 */
const LoginProvidersForm: React.FC<LoginProvidersFormParams> = ({
	redirectURL,
	containerParams,
	buttonParams,
	providers,
}) => {
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

		console.log("user cred", userCredential.user);

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

	const signInMethod = async (provider: Providers) => {
		switch (provider) {
		case "facebook":
			await facebookSignIn();
			break;
		case "google":
			await googleSignIn();
			break;
		default:
			await signInGuest();
		}
	};

	return (
		<>
			<div className={containerParams}>
				{providers.map((provider) => (
					<ActionButton
						key={provider}
						className={buttonParams}
						startIcon={provider}
						action={() => signInMethod(provider)}
						title={
							provider.charAt(0).toUpperCase() + provider.slice(1)
						}
					/>
				))}
			</div>
		</>
	);
};

LoginProvidersForm.defaultProps = {
	buttonParams: "my-4 w-full",
};
