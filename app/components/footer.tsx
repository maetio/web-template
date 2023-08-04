import React from "react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
// eslint-disable-next-line import/no-extraneous-dependencies

export /**
 * Reusable page header/toolbar
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 *
 */ const Footer = () => (
	<footer className="bg-white">
		<div className="mx-auto mt-20 max-w-7xl overflow-hidden px-6 sm:mt-24 lg:px-8">
			<nav
				className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
				aria-label="Footer"
			>
				<div className="pb-6 text-center sm:px-3">
					<Link
						href="https://www.maet.io/"
						className="text-sm leading-6 text-gray-600 hover:text-gray-900"
					>
						About
					</Link>
				</div>
				<div className="pb-6 text-center sm:px-3">
					<Link
						href="https://blog.maet.io/"
						className="text-sm leading-6 text-gray-600 hover:text-gray-900"
					>
						Blog
					</Link>
				</div>
			</nav>
			<div className="mt-10 flex justify-center space-x-10">
				<Link
					href="https://www.linkedin.com/company/maetio"
					className="text-gray-400 hover:text-gray-500"
				>
					<span className="sr-only">LinkedIn</span>
					<FaLinkedinIn className="h-6 w-6" aria-hidden="true" />
				</Link>
				<Link
					href="https://instagram.com/playmaet"
					className="text-gray-400 hover:text-gray-500"
				>
					<span className="sr-only">Instagram</span>
					<FaInstagram className="h-6 w-6" aria-hidden="true" />
				</Link>
				<Link
					href="https://github.com/maetio"
					className="text-gray-400 hover:text-gray-500"
				>
					<span className="sr-only">Github</span>
					<FaGithub className="h-6 w-6" aria-hidden="true" />
				</Link>
			</div>
			<p className="mt-10 text-center text-xs leading-5 text-gray-500">
				&copy; 2023 Maet Inc. All rights reserved.
			</p>
		</div>
	</footer>
);
