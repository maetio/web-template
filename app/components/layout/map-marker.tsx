"use client";

import React from "react";
import { MdLocationOn } from "react-icons/md";

export const AnyReactComponent: React.FC<{
	text?: string;
	lat: number;
	lng: number;
}> = ({ text }: { text?: string }) => {
	return (
		<div>
			<MdLocationOn className="h-10 w-10" />
			{text && <p>{text}</p>}
		</div>
	);
};
