import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ProgressNav } from "../components/ProgressNav.tsx";
import { HeaderNavigation } from "../components/HeaderNavigation.tsx";
import { Breadcrumbs } from "../components/Breadcrumbs.tsx";
import { ReturnTopBtn } from "../components/ReturnTopBtn.tsx";

export function RootPage(): JSX.Element {
	const isDebugMode = import.meta.env.VITE_DEBBUG === "true";

	return (
		<>
			<header id={"header"}>
				<HeaderNavigation />
				<ReturnTopBtn />
				{isDebugMode && <ProgressNav />}
			</header>
			<main id={"content"} style={{ minHeight: "calc(100vh - 4rem)", paddingTop: "5rem" }}>
				<Container>
					<Breadcrumbs />
					<Outlet />
					<ScrollRestoration />
				</Container>
			</main>
			<footer>
				<hr />
				<p className={"text-center"}>
					<small className="text-muted">{"© " + new Date().getFullYear() + " - All rights reserved"}</small>
				</p>
			</footer>
		</>
	);
}
