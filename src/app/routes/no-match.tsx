import { Link } from "react-router-dom";

const NoMatchPage = (): JSX.Element => {
	return (
		<>
			<section id={"no-match-page"}>
				<header>
					<h1 className={"h2"}>Nothing to see here!</h1>
					<p>We couldn't find the page you were looking for. Please check the URL or go back to the home page.</p>
				</header>
				<hr />
				<section>
					<h2 className={"h3"}>
						Error <span className={"text-danger"}>404</span>
					</h2>
					<p>
						<Link to={".."}>
							<i className={"bi bi-arrow-left me-1"}></i>
							Go to the home
						</Link>
					</p>
				</section>
			</section>
		</>
	);
};

/**
 *
 * @returns
 */
export function NoMatchRoute(): JSX.Element {
	return <NoMatchPage />;
}
