"use client";

import React from "react";
import { MaetIcon } from "../icons";

export const AnyReactComponent: React.FC<{
	text: string;
	lat: number;
	lng: number;
}> = ({ text }: { text: string }) => {
	return (
		<div>
			<MaetIcon />
			<p>{text}</p>
		</div>
	);
};
