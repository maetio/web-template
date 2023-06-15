import { getCompetitions } from "app/api/fetch/competitions";
import { CompetitionCard } from "../../stories/competition-card";

export default async function Page() {
	// fetch the competitions
	const data = await getCompetitions();
   
	// map the data in the page
	return <main>
		{data.docs.map((item) => <h1 key={item.id}>{item.data().name}</h1>)}
	</main>;
}