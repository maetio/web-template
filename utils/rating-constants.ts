import { Rating } from "types/rating";


export const InitialRating: Rating = {
	mean: 1500,
	ratingDeviation: 350,
	volatility: 0.06,
	displayRating: 100,
	numGames: 0,
};

export const NullRating: Rating = {
	mean: 0,
	ratingDeviation: 0,
	volatility: 0,
	displayRating: 0,
	numGames: 0,
};

export /** Number of placement games before rating converges to actual rating @type {*} */
const PlacementGames = 30;

/** Describes the number of tiers for the rating system */
export const NumberTiers = 10;

/** Number of days that you can report results after the game. Also used for viewingin activity in UI @type {*} */
export const RatingTimePeriodDays = 4;