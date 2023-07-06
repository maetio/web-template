import Link from "next/link";
import { ExampleMutation } from "./example-mutation-server";
import { ExampleMutationClient } from "./example-mutation-client";

/**
 * server component that displays the profile screen
 *
 * @export
 * @return {*}
 */
export default function Profile() {
	return (
		<div>
			<nav>
				<Link href="/">
					<text>Go back to home page</text>
				</Link>
			</nav>
			<h1>Profile page</h1>
			<p>This page is server-side rendered</p>
			<ExampleMutation />
			<ExampleMutationClient />
		</div>
	);
}
