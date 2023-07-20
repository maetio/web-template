"use client";

import React from "react";
import { signOutUser } from "auth/client";
import { ActionButton } from "app/components/action-button";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const SignOutButton = () => {
	return (
		<ActionButton
			referRoute="/"
			title="Sign Out"
			colorVariant="red"
			action={signOutUser}
		/>
	);
};
