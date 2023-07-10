"use client";

import {
	ReactNode, createContext, useContext, useState, useEffect, useMemo
} from "react";
import {
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "config/client";
import { AuthUser } from "types/";
import { signInWithLink } from "auth/client";

// create auth context
export const AuthContext = createContext<AuthUser | null>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<{ defaultUser: AuthUser | null; children: ReactNode }> = ({
	defaultUser,
	children
}) => {
	// set user states
	const [user, setUser] = useState<AuthUser | null>(defaultUser);
	const [loading, setLoading] = useState(true);

	// will sign in the user if there is an email link referred
	useEffect(() => {
		if (window.location.href.includes("apiKey")) {
			const email = localStorage.getItem("email");
			signInWithLink(email, window.location.href);
		}
	}, []);

	// detect the auth state change
	useEffect(() => {
		// use the firebase on auth state changed listener
		const unsubscribe = onAuthStateChanged(auth, async (userObserver) => {
			if (userObserver) {
				// set the user state
				setUser({
					id: userObserver.uid,
					email: userObserver.email,
					emailVerified: userObserver.emailVerified,
					isAnonymous: false,
					phoneNumber: userObserver.phoneNumber
				});

				// get the id token from firebase
				const idTokenResult = await userObserver.getIdTokenResult();

				// set the cookie with firebase auth edge middleware
				// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
				await fetch("/api/login", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${idTokenResult}`,
					},
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
		});

		return () => unsubscribe();
	}, []);

	// memoize user context
	const userContext = useMemo(() => (user), [user]);
	return (
		<AuthContext.Provider value={userContext}>
			{loading ? <div>Loading...</div> : children}
		</AuthContext.Provider>
	);
};