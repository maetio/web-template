import { AuthButton } from "app/components/auth-button";
import Link from "next/link";

export default function Header() {

	return (
		<nav>
			<Link style={{ padding: "8px" }} href="/">
				<text>Home</text>
			</Link>
			<AuthButton />
		</nav>
	);
}