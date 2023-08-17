import SkeletonCard from "./components/cards/skeleton-card";

/**
 * Loading UI for rendering
 * Can embed different loading skeletons depending on the location in the app router
 * https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 * @returns
 */
export const Loading = () => {
	return (
		<div className="min-w-[100vh] min-h-[100vh]">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
};

export default Loading;
