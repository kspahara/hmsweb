import { Outlet, useLoaderData } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function ProtectedRoutePage() {
	const data = useLoaderData() as { message: string };

	return (
		<>
			<main>
				<h1>{data.message}</h1>
				<Breadcrumbs />
				<Outlet />
			</main>
		</>
	);
}
