import { Link } from "react-router-dom";

const NoMatchPage = (): JSX.Element => {
	return (
		<>
			<main id={"no-match-page"}>
				<section>
					<h1>Nothing to see here!</h1>
					<p>
						<Link to={"/"}>Go to the home page</Link>
					</p>
				</section>
			</main>
		</>
	);
};

export function NoMatchRoute(): JSX.Element {
	return <NoMatchPage />;
}
