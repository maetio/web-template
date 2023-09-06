"use client";

import React, { useEffect, useState } from "react";

export const CircularProgressBar: React.FC<{ number: number }> = ({
	number,
}) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (progress < number) {
				setProgress((prevProgress) => prevProgress + 1);
			} else {
				clearInterval(interval);
			}
		}, 20); // Adjust the interval to control the animation speed

		return () => clearInterval(interval);
	}, [number, progress]);

	const radius = 20; // Adjust the radius of the circle
	const circumference = 2 * Math.PI * radius;

	const strokeDashoffset = circumference - (progress / 100) * circumference;

	return (
		<div className="relative h-12 w-12">
			{/* <div> */}
			<svg className="h-full w-full">
				<circle
					className="fill-transparent stroke-indigo-600"
					strokeWidth="8" // Adjust the stroke width here
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					r={radius}
					cx="50%"
					cy="50%"
				/>
			</svg>
			<div className=" absolute inset-0 flex items-center justify-center ">
				<div className="relative">
					<p className="animate-progress-grow absolute flex h-full w-full items-center justify-center text-xs font-bold">
						{progress}%
					</p>
				</div>
			</div>
			{/* </div> */}
		</div>
	);
};
