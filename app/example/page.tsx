import { getCompetitions } from "app/api/fetch/competitions";

export default async function Page() {
	// fetch the competitions
	const data = await getCompetitions();
   
	// map the data in the page
	return <main>
		{data.docs.map((item) => <h1 key={item.id}>{item.data().name}</h1>)}
	</main>;
}