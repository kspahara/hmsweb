import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
	const error = useRouteError() as Error;
	console.error(error);

	return (
		<main id={"content"} style={{ minHeight: "calc(100vh - 4rem)", paddingTop: "5rem" }}>
			<Container>
				<section id={"error-page"}>
					<header>
						<h1 className={"h2"}>Oops!</h1>
						<p>Sorry, an unexpected error has occurred.</p>
					</header>
					<hr />
					<section>
						<p>
							<i>{error.name || error.message}</i>
						</p>
						<Link to={"/"}>
							<i className={"bi bi-arrow-left me-1"}></i>
							{"Return to the top page"}
						</Link>
					</section>
				</section>
			</Container>
		</main>
	);
}
