import React from "react";

export type SkeletonCardProps = {};

const SkeletonCard: React.FC<SkeletonCardProps> = () => {
	return (
		<div className="mt-3 h-auto w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
			<div className="flex flex-col space-y-6">
				<div className="h-9 w-1/3 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-1/2 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-2/3 rounded-md bg-gray-300 "></div>
				<div className="h-9 w-11/12 rounded-md bg-gray-300 "></div>
			</div>
		</div>
	);
};

export default SkeletonCard;
