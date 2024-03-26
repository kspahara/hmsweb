import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function PublicPage(): JSX.Element {
	const { user } = useRouteLoaderData("root") as { user: string | null };
	const data = useLoaderData() as { message: string };

	return (
		<>
			<main id={"public-page"}>
				<h1>{data.message}</h1>
				<Breadcrumbs />
				<p>Welcome, {user || "guest"}!</p>
			</main>
		</>
	);
}
