"use client";

import { createContext } from "react";
import { Tenant } from "./types";

export interface AuthContextValue {
	tenant: Tenant | null;
}

// auth context for user/tenant
export const AuthContext = createContext<AuthContextValue>({
	tenant: null,
});
