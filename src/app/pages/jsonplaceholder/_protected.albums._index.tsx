import { SearchArea } from "../../components/searchArea.tsx";
import { ContentArea } from "../../components/contentArea.tsx";
import { useProtectedAlbumsPage } from "../../hooks/hooks.ts";

/**
 *
 * @returns
 */
export function ProtectedAlbumsPage(): JSX.Element {
	const props = useProtectedAlbumsPage();

	return (
		<>
			<section id={"protected-alubums-page"}>
				<header>
					<h1 className={"h2"}>{props.message}</h1>
					<p>Protected Albums</p>
					<div id={"search"}>
						<SearchArea {...props} />
					</div>
				</header>
				<hr />
				<section>
					<h2 className={"h3"}>{"Album List"}</h2>
					<div id={"content"}>
						<ContentArea data={props.data} />
					</div>
				</section>
			</section>
		</>
	);
}
