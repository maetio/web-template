import { ServerAuthProvider } from "auth/server-auth-provider";

/**
 * layout for login page, wraps children with ServerAuthProvider
 *
 * @export
 * @param {{
 * 	children: React.ReactNode;
 * }} {
 * 	children,
 * }
 * @return {*}
 */
export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ServerAuthProvider>{children}</ServerAuthProvider>;
}
