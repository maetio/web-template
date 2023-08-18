import { PlayersResponseType } from "types/next-api";

export const capitalizeFirstLetter = (str?: String) => {
	if (str) return str.charAt(0).toUpperCase() + str.slice(1);
	return "";
};
export /**
 * support function that converts player rating into a usable histogram format for Victory graphs
 *
 * @param {PlayersResponseType} players
 * @return {*}
 */
const filterPlayerData = (players: PlayersResponseType) => {
	const victoryData: number[] = [];

	// grab each player rating
	players.forEach((player) => {
		if (player.rating?.displayRating)
			victoryData.push(player.rating?.displayRating);
	});

	// get each bin(sections of histogram)
	const binEdges = [0, 1750, 1850, 1950, 2050, 3500];

	// filter the data into each section of the histogram
	const histogramData = binEdges.map((edge, index) => ({
		x: index,
		y: victoryData.filter(
			(rating) => rating >= edge && rating < binEdges[index + 1]
		).length,
	}));

	// return the filtered data, so that victory can display the data
	return histogramData;
};
