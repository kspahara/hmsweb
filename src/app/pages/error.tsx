import { useRouteError } from "react-router-dom";

export function ErrorPage() {
	const error = useRouteError() as Error;
	console.error(error);

	return (
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
			</section>
		</section>
	);
}
