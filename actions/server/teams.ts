import { teamsCollection } from "./config";

export /**
 * Will fetch all the teams from the database
 *
 * @return {*}
 */
const getTeams = async () => {
	return teamsCollection.get();
};