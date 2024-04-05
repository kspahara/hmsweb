import { useLoaderData, useRouteLoaderData } from "react-router-dom";

export function PublicPage(): JSX.Element {
	const { user } = useRouteLoaderData("root") as { user: string | null };
	const data = useLoaderData() as { message: string };

	return (
		<>
			<section id={"public-page"}>
				<header>
					<h1>{data.message}</h1>
					<p>Welcome, {user || "guest"}!</p>
				</header>
				<hr />
				<section>
					<h2>{"Public Page"}</h2>
					<p>{"This is a public route."}</p>
				</section>
			</section>
		</>
	);
}
