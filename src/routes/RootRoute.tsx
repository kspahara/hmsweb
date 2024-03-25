import { NavLink } from "react-router-dom";
import { RootPage } from "../pages/RootPage";
import { authProvider } from "../provides/auth";
import { Breadcrumb } from "react-bootstrap";

const clientLoader = async () => {
	// ログインしている場合、rootルートは常にauthProviderを返す
	return { user: authProvider.username, isAuth: authProvider.isAuthenticated };
};

const handle = {
	crumb: (match: { pathname: string }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}` },
			active: location.pathname === match.pathname,
		};
		const label = "Home";
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

export function RootRoute(): JSX.Element {
	return <RootPage />;
}

RootRoute.loader = clientLoader;
RootRoute.handle = handle;
