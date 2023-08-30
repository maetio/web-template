"use client";

import React from "react";

export const AnyReactComponent: React.FC<{
	text: string;
	lat: number;
	lng: number;
}> = ({ text }: { text: string }) => {
	return <div>{text}</div>;
};
