import { ContentArea } from "../../components/contentArea.tsx";
import { SearchArea } from "../../components/searchArea.tsx";
import { useCommentsPage } from "../../hooks/hooks.ts";

/**
 *
 * @returns
 */
export function ProtectedCommentsPage() {
	const props = useCommentsPage();

	return (
		<>
			<section id={"protexted-comments-page"}>
				<header>
					<h1 className={"h2"}>{props.message}</h1>
					<p>Protected Comments</p>
					<SearchArea {...props} />
				</header>
				<hr />
				<section>
					<h2 className={"h3"}>ProtectedCommentsPage</h2>
					<ContentArea data={props.data} />
				</section>
			</section>
		</>
	);
}
