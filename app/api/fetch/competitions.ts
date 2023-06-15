import { competitionsCollection } from "app/api/config";

export /**
 * Will fetch all the competitions from the database
 *
 * @return {*} 
 */
const getCompetitions = async () => {
	return competitionsCollection.get();
};
