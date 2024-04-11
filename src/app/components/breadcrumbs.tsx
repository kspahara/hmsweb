import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { useBreadcrumbs } from "../hooks/hooks";

type Crumb = {
	handle: {
		crumb: (match: { params: Record<string, string> }) => JSX.Element;
	};
	params: Record<string, string>;
};

type CrumbItemProps = {
	props: {
		linkProps: { to: string; end?: boolean };
		active: boolean;
	};
	label: JSX.Element;
};

export type Match<T> = {
	pathname: string;
	data: {
		data: T;
	};
};

/**
 *
 * @returns
 */
export function Breadcrumbs(): JSX.Element {
	const { matches } = useBreadcrumbs() as { matches: Crumb[] };

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

/**
 *
 * @param props
 * @returns
 */
export function CrumbItem({ props, label }: CrumbItemProps): JSX.Element {
	return (
		<Breadcrumb.Item {...props} linkAs={NavLink}>
			{label}
		</Breadcrumb.Item>
	);
}
