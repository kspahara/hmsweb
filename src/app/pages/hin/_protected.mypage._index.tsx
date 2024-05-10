import { SearchArea } from "../../components/searchArea.tsx";
import { ContentArea } from "../../components/contentArea.tsx";
import { useProtectedMypagePage } from "../../hooks/hooks.ts";

/**
 *
 * @returns
 */
export function ProtectedMypagePage(): JSX.Element {
	const { data, type, message, ...props } = useProtectedMypagePage();

	return (
		<>
			<section id="protected-alubums-page">
				<header>
					<h1 className="h2">{message}</h1>
					<p>Protected Mypage</p>
					<div id="search">
						<SearchArea {...props} />
					</div>
				</header>
				<hr />
				<section>
					<h2 className="h3">Mypage</h2>
					<div id="content">
						<ContentArea {...{ data, type }} />
					</div>
				</section>
			</section>
		</>
	);
}
