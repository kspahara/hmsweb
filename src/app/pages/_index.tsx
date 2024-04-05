import { Outlet } from "react-router-dom";
import { ProgressNav } from "../components/ProgressNav";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Container } from "react-bootstrap";
import { ReturnTopBtn } from "../components/ReturnTopBtn";

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
