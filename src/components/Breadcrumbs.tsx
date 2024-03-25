import { Fragment } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useMatches } from "react-router-dom";

export function Breadcrumbs(): JSX.Element {
	const matches: any[] = useMatches();
	// console.log("matches", matches);

	return (
		<Breadcrumb>
			{matches
				.filter((match) => match.handle && match.handle.crumb)
				.map((match, index) => (
					<Fragment key={index}>{match.handle.crumb(match)}</Fragment>
				))}
		</Breadcrumb>
	);
}
