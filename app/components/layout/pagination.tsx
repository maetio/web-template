"use client";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

interface PaginationListParams {
	totalListCount?: number;
	listCountLabel?: string;
	forwardAction?: () => void;
	backwardsAction?: () => void;
	className?: string;
}

export const PaginationList: React.FC<PaginationListParams> = ({
	totalListCount,
	listCountLabel,
	forwardAction,
	backwardsAction,
	className,
}) => {
	return (
		<div
			className={`flex items-center justify-between bg-white px-4 pt-3 sm:px-6 ${className}`}
		>
			<div className="flex flex-1 justify-between sm:hidden">
				<button
					onClick={backwardsAction}
					className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Previous
				</button>
				<button
					onClick={forwardAction}
					className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Next
				</button>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				{totalListCount ? (
					<div>
						<p className="text-sm text-gray-700">
							{listCountLabel} {totalListCount}
						</p>
					</div>
				) : null}

				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<button
							onClick={backwardsAction}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<span className="sr-only">Previous</span>
							<BsChevronLeft
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</button>
						<button
							onClick={forwardAction}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<span className="sr-only">Next</span>
							<BsChevronRight
								className="h-5 w-5"
								aria-hidden="true"
							/>
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};
