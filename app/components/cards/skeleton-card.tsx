import React from "react";

export type SkeletonCardProps = {}

const SkeletonCard: React.FC<SkeletonCardProps> = () => {
	return (
		<div className="w-full mt-3 animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 h-auto ">
			<div className="flex flex-col space-y-6">
				<div className="h-6 w-1/3 rounded-md bg-gray-300 "></div>
				<div className="h-6 w-1/2 rounded-md bg-gray-300 "></div>
				<div className="h-6 w-2/3 rounded-md bg-gray-300 "></div>
				<div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
			</div>
		</div>
	);
};

export default SkeletonCard;