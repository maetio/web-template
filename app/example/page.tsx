export default async function Page() {
	const data = await getData();
   
	return <main>
		<h1>
            Testing
		</h1>
	</main>;
}