import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { Competition } from "./competition";


/**
 * Auth User to set for the auth context
 *
 * @export
 * @interface AuthUser
 */
export interface AuthUser {
	id: string;
	email: string | null | undefined;
	emailVerified: boolean;
	isAnonymous: boolean;
	customClaims?: UserRecord["customClaims"];
	phoneNumber: string | null | undefined;
}

/**
 * User object that can be written by the user. Will update the public data.
 *
 * @export
 * @interface PrivateUserData
 * @extends {PublicUserData}
 */
export interface PrivateUserData extends AuthUser {
	firstName?: string | null;
	lastName?: string | null;
	image?: string | null;
	loggedIn: boolean;
	stripeID?: string;
	charges_enabled?: boolean;
	stripeSeller?: any;
	activeSport?: Competition["sport"];
}
