import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function ProtectedRoutePage() {
	return (
		<>
			<main>
				<h1>ProtectedRoutePage</h1>
				<Breadcrumbs />
				<Outlet />
			</main>
		</>
	);
}
