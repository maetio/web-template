"use client";

import React from "react";
import { BaseURL } from "config/constants";
import { AuthEmailForm } from "app/components/auth-email-form";

export /**
 * Enter email form
 *
 * @return {*}
 */
const LoginPage: React.FC<{}> = () => {
	// set the url to refer back after email sign in
	const referringURL =
		document.referrer.startsWith(BaseURL) &&
		!document.referrer.endsWith("login")
			? document.referrer
			: undefined;

	return <AuthEmailForm redirectURL={referringURL} />;
};

export default LoginPage;
