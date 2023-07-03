import { Competition, EndTimestamp, StartTimestamp } from "app/types";
import { competitionsCollection } from "config/server-collections";

export /**
 * Will fetch all the competitions from the database
 *
 * @return {*}
 */
const getCompetitions = async () => {
	const data = await competitionsCollection.get();
	return data;
};

export /**
 * Will fetch one competition from the database
 * 
 * @param {string} id 
 * @returns 
 */
const getCompetition = async (id: string) => {
	const data = await competitionsCollection.doc(id).get();
	return data;
};
