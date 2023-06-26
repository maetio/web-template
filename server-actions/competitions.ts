import { competitionsCollection } from "./config";

export /**
 * Will fetch all the competitions from the database
 *
 * @return {*}
 */
const getCompetitions = async () => {
	return competitionsCollection.get();
};
