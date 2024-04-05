import { NavLink } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getLocationPath } from "../../libs/libs";

export const handle = {
	crumb: (match: { pathname: string }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}`, end: true },
			active: getLocationPath() === match.pathname,
		};
		const label = "Comments";
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};
