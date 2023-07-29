"use client";

import {
	ReactNode,
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
} from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth, privateUserCollection } from "config/client";
import { PrivateUserData } from "types/index";
import { getPrivateUserData } from "auth/client";
import { doc, onSnapshot } from "firebase/firestore";
import SkeletonCard from "app/components/cards/skeleton-card";

// create auth context
export const AuthContext = createContext<PrivateUserData | null>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{
	defaultUser: PrivateUserData | null;
	children: ReactNode;
}> = ({ defaultUser, children }) => {
	// set user states
	const [user, setUser] = useState<PrivateUserData | null>(defaultUser);
	const [loading, setLoading] = useState(true);

	// will sign in the user if there is an email link referred
	// useEffect(() => {
	// 	if (window.location.href.includes("apiKey")) {
	// 		// const email = localStorage.getItem("email");
	// 		const email = UniversalCookies.get("email");
	// 		signInWithLink(email, window.location.href);
	// 	}
	// }, []);

	// detect the auth state change
	useEffect(() => {
		// use the firebase on auth state changed listener
		const unsubscribe = onIdTokenChanged(auth, async (userObserver) => {
			if (userObserver) {
				// fetch the private user data
				const userData = await getPrivateUserData(userObserver.uid);

				// set the user state
				setUser({
					...userData,
					id: userObserver.uid,
					email: userObserver.email,
					emailVerified: userObserver.emailVerified,
					isAnonymous: false,
					phoneNumber: userObserver.phoneNumber,
					loggedIn: true,
				});

				// DO NOT SET THE COOKIE SINCE THE FUNCTIONS ALREADY DO THIS

				// get the id token from firebase
				// const idTokenResult = await userObserver.getIdTokenResult();

				// set the cookie with firebase auth edge middleware
				// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
				// await fetch("/api/login", {
				// 	method: "GET",
				// 	headers: {
				// 		Authorization: `Bearer ${idTokenResult}`,
				// 	},
				// });
			} else {
				setUser(null);

				// Remove authentication cookies for firebase auth edge
				// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
				await fetch("/api/logout", {
					method: "GET",
				});
			}
			setLoading(false);
		});

		// unsubscribe to detach listener
		return () => unsubscribe();
	}, []);

	// add listener for private user data
	useEffect(() => {
		// use the firebase on auth state changed listener
		const unsubscribe = onSnapshot(
			doc(privateUserCollection, user?.id || "1"),
			async (userDoc) => {
				if (userDoc.exists()) {
					// get the data
					const userData = userDoc.data();
					// set the user state
					setUser({
						...userData,
						id: userData.id,
						email: userData.email,
						emailVerified: userData.emailVerified || false,
						isAnonymous: false,
						phoneNumber: userData.phoneNumber,
						loggedIn: true,
					});
				} else {
					setUser(null);
					// Remove authentication cookies for firebase auth edge
					// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
					await fetch("/api/logout", {
						method: "GET",
					});
				}
				setLoading(false);
			}
		);

		// unsubscribe to detach listener
		return () => unsubscribe();
	}, [user?.id]);

	// memoize user context
	const userContext = useMemo(() => user, [user]);
	return (
		<AuthContext.Provider value={userContext}>
			{loading ? (
				<div>
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};
