"use client";

/**
 * Server component that displays the profile screen
 *
 * @export
 * @return {*}
 */
export default function Profile() {
	const handlePress = async () => {
		const thing = await fetch(
			"http://localhost:3000/api/stripe/create-stripe-account/PKSlgS5QTif09Pp2cC6ovqMWPvt1",
			{ method: "POST" }
		);
		console.log("thing", thing);
		const otherThing = await thing.json();
		console.log("thingy", otherThing);
	};
	return (
		<div>
			<button onClick={handlePress}>press</button>
		</div>
	);
}
