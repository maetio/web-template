import { Team } from "app/types";
import { doc, getDoc } from "firebase/firestore";
import { teamsCollection } from "config/server-collections";

export /**
 * Will fetch all the teams from the database
 *
 * @return {*}
 */
const getTeams = async () => {
	return teamsCollection.get();
};

/*
const getTeam = async (id: string): Promise<{ id: string } & Partial<Team>> => {
	const docRef = doc(teamsCollection, id);
	const teamDoc = await getDoc(docRef);

	return { id: teamDoc.id, ...teamDoc.data() };
};
*/
