import { Rating } from "types/rating";

export /**
 * Function will sum the rating objects that are passed
 *
 * @param {Array<Rating>} players
 * @return {*}  {Rating}
 */
const sumRatingObjects = (players: Array<Rating | undefined>): Rating => {
	const sumRating: Rating = {
		mean: 0,
		ratingDeviation: 0,
		volatility: 0,
		displayRating: 0,
		numGames: 1,
	};
	players.forEach((player) => {
		sumRating.mean += player ? player.mean : 0;
		sumRating.ratingDeviation += player ? player.ratingDeviation : 0;
		sumRating.volatility += player ? player.volatility : 0;
		sumRating.displayRating += player ? player.displayRating : 0;
		sumRating.numGames += player ? player.numGames : 0;
	});
	return sumRating;
};

export /**
 * Function will average the rating objects that are passed
 *
 * @param {Array<Rating>} players
 * @return {*}  {Rating}
 */
const averageRatingObjects = (players: Array<Rating | undefined>): Rating => {
	if (!players.length) throw Error("No players in rating object");
	const sumRating = sumRatingObjects(players);
	// divide out the sum
	sumRating.mean /= players.length;
	sumRating.ratingDeviation /= players.length;
	sumRating.volatility /= players.length;
	sumRating.displayRating /= players.length;
	sumRating.numGames /= players.length;
	return sumRating;
};