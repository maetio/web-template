"use server";

import { competitionsCollection } from "config/server-collections";

export /**
 * Will fetch all the competitions from the database
 *
 * @return {*}
 */
const getCompetitions = async () => {
	const competitions = await competitionsCollection.get();
	return competitions;
};
