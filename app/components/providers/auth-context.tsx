"use client";

import {
	ReactNode, createContext, useContext, useState, useEffect, useMemo
} from "react";
import {
	onAuthStateChanged,
	User
} from "firebase/auth";
import { auth } from "app/api/auth";

type Props = {
    children: ReactNode;
};

// create auth context
export const AuthContext = createContext<User | null>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
	children
}: Props) => {
	// set user states
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// detect the auth state change
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userObserver) => {
			if (userObserver) {
				setUser(userObserver);
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
