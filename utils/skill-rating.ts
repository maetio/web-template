// eslint-disable-next-line import/no-extraneous-dependencies
import { createPlayerFactory, Match } from "glicko-two";
import { Rating } from "types/index";
import { InitialRating, PlacementGames } from "./rating-constants";

const createPlayer = createPlayerFactory({
	defaultRating: InitialRating.mean,
	defaultRatingDeviation: InitialRating.ratingDeviation,
	defaultVolatility: InitialRating.volatility,
	tau: 0.5,
});

export type GameStatus =
	| "team1-winner"
	| "team2-winner"
	| "tie"
	| "no-contest"
	| "unreported"
	| "disputed";

export /**
 * Function will infer the game status
 *
 * @param {(number | undefined)} team1Points
 * @param {(number | undefined)} team2Points
 * @return {*}  {Game['status']}
 */
const inferGameStatus = (
	team1Points: number | undefined | null,
	team2Points: number | undefined | null
): GameStatus => {
	if (
		(!team1Points || !team2Points) &&
		team1Points !== 0 &&
		team2Points !== 0
	)
		return "unreported";
	if (Number(team1Points) > Number(team2Points)) return "team1-winner";
	if (Number(team1Points) < Number(team2Points)) return "team2-winner";
	return "tie";
};

export /**
 * Function will calculate the display rating
 * Display rating is necessary for the player to have the placement games that will make them stabalize at a rating
 * Prevents them from just making a new account without working their up through the rankings
 *
 * @param {number} oldMean
 * @param {number} newMean
 * @param {number} oldDisplayRating
 * @param {number} numGames
 * @return {*}  {number}
 */
const getDisplayRating = (
	oldMean: number | undefined,
	newMean: number | undefined,
	oldDisplayRating: number | undefined,
	numGames: number | undefined
): number => {
	// return the initial display rating
	if (!oldMean || !newMean)
		return oldDisplayRating || InitialRating.displayRating;

	// set the baseline rating and total games
	const baselineRating =
		!numGames || !oldDisplayRating
			? InitialRating.displayRating
			: oldDisplayRating;
	const totalGames = numGames || 1;

	// return the actual rating
	if (totalGames >= PlacementGames) return newMean;

	// return the porportion to the actual mean if they gain points
	if (newMean >= oldMean) {
		return (
			baselineRating +
			(newMean - baselineRating) * (totalGames / PlacementGames)
		);
	}

	// if they lost points, lose a proportion that is relative to the current display rating
	return baselineRating * (newMean / oldMean);
};

export /**
 * Function will return the updated ratings for a game result that is input
 *
 * @param {Rating} player1
 * @param {Rating} player2
 * @param {{ player1Points: number; player2Points: number }} score
 * @return {{ player1: Rating, player2: Rating }}
 */
const simulateMatchup = (
	player1: Rating | undefined,
	player2: Rating | undefined,
	score: {
		player1Points: number | undefined | null;
		player2Points: number | undefined | null;
	}
) => {
	// declare player objects
	const player1Obj = createPlayer({
		rating: player1?.mean,
		ratingDeviation: player1?.ratingDeviation,
		volatility: player1?.volatility,
	});
	const player2Obj = createPlayer({
		rating: player2?.mean,
		ratingDeviation: player2?.ratingDeviation,
		volatility: player2?.volatility,
	});

	// declare match and report outcome
	const match = new Match(player1Obj, player2Obj);
	if (score.player1Points && score.player2Points) {
		match.reportOutcome([score.player1Points, score.player2Points]);
		match.updatePlayerRatings();
	}

	// get game status
	const gameStatus = inferGameStatus(
		score.player1Points,
		score.player2Points
	);

	// if the game status changes to unreported
	let player1Games = player1?.numGames ? player1.numGames + 1 : 1;
	let player2Games = player2?.numGames ? player2.numGames + 1 : 1;
	if (gameStatus !== "unreported") {
		player1Games += 1;
		player2Games += 1;
	}

	// if status used to be reported and it has switched, subtract from game total
	if (gameStatus === "unreported") {
		player1Games -= 1;
		player2Games -= 1;
	}

	// return results
	const updatedPlayer1: Rating = {
		mean: player1Obj.rating,
		ratingDeviation: player1Obj.ratingDeviation,
		volatility: player1Obj.volatility,
		displayRating: getDisplayRating(
			player1?.mean,
			player1Obj.rating,
			player1?.displayRating,
			player1?.numGames
		),
		numGames: player1Games,
	};
	const updatedPlayer2: Rating = {
		mean: player2Obj.rating,
		ratingDeviation: player2Obj.ratingDeviation,
		volatility: player2Obj.volatility,
		displayRating: getDisplayRating(
			player2?.mean,
			player2Obj.rating,
			player2?.displayRating,
			player2?.numGames
		),
		numGames: player2Games,
	};
	return { player1: updatedPlayer1, player2: updatedPlayer2 };
};

export /**
 * Function will return the delta rating object
 *
 * @param {Rating} before
 * @param {Rating} after
 * @return {*}  {Rating}
 */
const getDeltaRating = (
	before: Rating | undefined,
	after: Rating | undefined
): Rating => ({
	mean: after && before ? after.mean - before.mean : 0,
	ratingDeviation:
		after && before ? after.ratingDeviation - before.ratingDeviation : 0,
	volatility: after && before ? after.volatility - before.volatility : 0,
	displayRating:
		after && before ? after.displayRating - before.displayRating : 0,
	numGames: after && before ? after.numGames - before.numGames : 1,
});

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
	const sumRating = sumRatingObjects(players);
	// divide out the sum
	sumRating.mean /= players.length;
	sumRating.ratingDeviation /= players.length;
	sumRating.volatility /= players.length;
	sumRating.displayRating /= players.length;
	sumRating.numGames /= players.length;
	return sumRating;
};

export /**
 * Will return the new player rating for the matchup
 *
 * @param {Rating} playerRating
 * @param {Rating} teamRating
 * @param {Rating} averageTeammate
 * @param {Rating} oppTeam
 * @param {Rating} oppAveragePlayer
 * @param {boolean} win
 */
const calculateNewPlayerRating = (
	playerRating: Rating | undefined,
	teamRating: Rating | undefined,
	averageTeammate: Rating | undefined,
	oppTeam: Rating | undefined,
	oppAveragePlayer: Rating | undefined,
	score: {
		ownPoints: number | undefined | null;
		oppPoints: number | undefined | null;
	}
) => {
	// change the whole rating object except for the num games and rating deviation (the player's own experience level)
	const aggregatedRating: Rating = {
		...averageRatingObjects([playerRating, teamRating, averageTeammate]),
		ratingDeviation:
			playerRating?.ratingDeviation || InitialRating.ratingDeviation,
		numGames: playerRating?.numGames || 1,
	};

	// define the opponent rating object
	const oppRating = averageRatingObjects([oppTeam, oppAveragePlayer]);

	// calculate the new aggregated rating
	const { player1: newAggregatedRating } = simulateMatchup(
		aggregatedRating,
		oppRating,
		{
			player1Points: score.ownPoints,
			player2Points: score.oppPoints,
		}
	);

	// calculate the delta for this aggregated rating
	const deltaAggregatedRating = getDeltaRating(
		aggregatedRating,
		newAggregatedRating
	);

	// add the proper fields to the new player rating
	const newPlayerRating: Rating = {
		...sumRatingObjects([playerRating, deltaAggregatedRating]),
		numGames: playerRating?.numGames || 1,
	};

	return newPlayerRating;
};

export /**
 * Function will return the calculation of the tier
 *
 * @param {Rating} [rating]
 */
const calculateTier = (rating?: Rating) => {
	const breakPoints: Array<number> = [
		500, 800, 1000, 1250, 1500, 1750, 2000, 2250, 2500,
	];
	if (!rating) return 1;
	return (
		breakPoints.findIndex(
			(breakPoint) => rating.displayRating < breakPoint
		) + 1
	);
};
