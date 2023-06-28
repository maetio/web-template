import { getTeams } from "actions/server/teams";
import { PlayerCard, TeamCard } from "app/components/cards";
import { Grid } from "app/components/providers/mui-server-components";
import { getCompetitions } from "../../actions/server/competitions";

export default async function Page() {
	// fetch the competitions
	const data = await getCompetitions();
	const teamData = await getTeams();

	// map the data in the page
	return (
		<main>
			{data.docs.map((item) => (
				<h1 key={item.id}>{item.data().name}</h1>
			))}
			<Grid container direction="column">
				{teamData.docs.map((item) => (
					<TeamCard key={item.id} name={item.data().firstName} score={item.data().numPlayers} image={item.data().image}/>
				))}
			</Grid>
		</main>
	);
}
