import { teamsCollection } from "config/server-collections";

export /**
 * Will fetch all the teams from the database
 *
 * @return {*}
 */
const getTeams = async () => {
	const data = await teamsCollection.get();
	return data;
};

export /**
 * Will fetch one competition from the database
 *
 * @param {string} id
 * @returns
 */
const getTeam = async (id: string) => {
	const data = await teamsCollection.doc(id).get();
	return data;
};
/*
const getTeam = async (id: string): Promise<{ id: string } & Partial<Team>> => {
	const docRef = doc(teamsCollection, id);
	const teamDoc = await getDoc(docRef);

	return { id: teamDoc.id, ...teamDoc.data() };
};
*/
