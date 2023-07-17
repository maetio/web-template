import React from "react";
import { HeaderMaetIcon } from "app/components/icons";
import { ProfileButton } from "app/components/profile-button";
import Link from "next/link";

export /**
 * Reusable page header/toolbar
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 *
 */ const Header = () => (
	<div className="grid h-16 grid-cols-12 items-center gap-3 border-b">
		<div className="col-span-3 ml-2 flex items-center">
			<Link href="/">
				<div className="items center flex">
					<HeaderMaetIcon />
					<p className="ml-2 text-lg text-primaryMain">Maet</p>
				</div>
			</Link>
		</div>
		<div className="col-span-6 flex items-center justify-center mr-1">
			<div className="relative flex items-center justify-center lg:mr-0 mr-5">
				<input
					id="search"
					placeholder="Search"
					className=" h-10 flex-1 rounded-large border px-2 text-sm placeholder-black"
				></input>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					className="-ml-8 h-5 w-5 stroke-2"
				>
					<path
						strokeLinecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</div>
		</div>
		<ProfileButton />
	</div>
);
