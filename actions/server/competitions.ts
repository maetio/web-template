import { competitionsCollection } from "config/server-collections";

export /**
 * Will fetch all the competitions from the database
 *
 * @return {*}
 */
const getCompetitions = async () => {
	return competitionsCollection.get();
};
