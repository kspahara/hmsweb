import { Breadcrumb } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const handle = {
	crumb: (match: { pathname: string }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}`, end: true },
			active: location.pathname === match.pathname,
		};
		const label = "Albums";
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};
