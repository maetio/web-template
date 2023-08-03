import React from "react";

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="w-full bg-gray-200">{children}</div>;
}
