import React from "react";

export type SkeletonAnimationProps = {}

const SkeletonAnimation: React.FC<SkeletonAnimationProps> = () => {
	return (
		<div className="w-full mt-3 animate-pulse flex-row items-center justify-center space-x-1 p-6 h-auto ">
			<div className="flex flex-col space-y-28 items-center">
				<div className="h-9 w-11/12 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-2/3 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-3/4 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-1/3 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-1/4 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-1/2 rounded-md bg-gray-300 "></div>
				
			</div>
		</div>
	);
};

export default SkeletonAnimation;