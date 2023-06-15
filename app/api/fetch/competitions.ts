import { competitionsCollection } from "app/api/config";

export const getCompetitions = async () => {
	return competitionsCollection.get();
};
