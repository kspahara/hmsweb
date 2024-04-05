import { Fragment } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useMatches } from "react-router-dom";

export function Breadcrumbs(): JSX.Element {
	const matches = useMatches() as {
		handle: {
			crumb: (match: { params: Record<string, string> }) => JSX.Element;
		};
		params: Record<string, string>;
	}[];

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
