"use client";

import React, { useState } from "react";
import { MaetIcon } from "app/components/icons";
import { ProfileButton } from "app/components/profile-button";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { MdClose, MdMenu } from "react-icons/md";

export /**
 * Reusable page header/toolbar
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 *
 */ const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white border-b border-gray-900/10 h-20 fixed top-0 w-full z-50">
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div className="flex items-center gap-x-12">
					<Link href={"/"} className="-m-1.5 p-1.5 flex flex-row place-items-center">
						<MaetIcon size={10} />
						<h2 className="font-semibold text-lg ml-1">Maet</h2>
					</Link>
					<div className="hidden lg:flex lg:gap-x-12">
						<Link href={"https://www.maet.io/"} className="text-md leading-6 text-gray-900">
							About
						</Link>
						<Link href={"https://blog.maet.io/"} className="text-md leading-6 text-gray-900">
							Blog
						</Link>
					</div>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<MdMenu className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex">
					<ProfileButton />
				</div>
			</nav>
			<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link href={"/"} className="-m-1.5 p-1.5 flex flex-row place-items-center">
							<MaetIcon size={10} />
							<h2 className="font-semibold text-lg ml-1">Maet</h2>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<MdClose className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<Link href={"https://www.maet.io/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
									About
								</Link>
								<Link href={"https://blog.maet.io/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
									Blog
								</Link>
							</div>
							<div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
			  					<ProfileButton />
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
};