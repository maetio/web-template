"use client";

import React from "react";
import { signOutUser } from "auth/client";
import { SubmitFormActionButton } from "app/components/submit-form-action-button";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const SignOutButton = () => {
	return (
		<SubmitFormActionButton referRoute="/" title="Sign Out" colorVariant="red" icon="none" action={signOutUser} />
	);
};
