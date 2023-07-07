import Link from "next/link";
import React from "react";
import { ProfileButton } from "app/components/profile-button";


export /**
 * Reusable page header/toolbar
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 *
 */ const Header = () => (
	<ul>
		<li>
			<Link href="/">Home</Link>
		</li>
		<li>
			<ProfileButton />
		</li>
	</ul>
);
