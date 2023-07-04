import Link from "next/link";

export default function Header() {

	return (
		<nav>
			<Link style={{ padding: "8px" }} href="/">
				<text>Home</text>
			</Link>
			<Link style={{ padding: "8px" }} href="/login">
				<text>Sign In</text>
			</Link>
		</nav>
	);
}