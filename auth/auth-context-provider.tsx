"use client";

import {
	ReactNode, createContext, useContext, useState, useEffect, useMemo
} from "react";
import {
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "config/client";
import { AuthUser } from "app/types";

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

	// detect the auth state change
	useEffect(() => {
		// use the firebase on auth state changed listener
		const unsubscribe = onAuthStateChanged(auth, (userObserver) => {
			if (userObserver) {
				setUser({
					id: userObserver.uid,
					email: userObserver.email,
					emailVerified: userObserver.emailVerified,
					isAnonymous: false,
					phoneNumber: userObserver.phoneNumber
				});
			} else {
				setUser(null);
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