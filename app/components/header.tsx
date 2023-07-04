import Link from "next/link";

export default function Header() {

	return (
		<nav>
			<Link href="/">
				<text>Go back to home page</text>
			</Link>
		</nav>
	);
}