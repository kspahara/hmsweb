import { NavLink } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { RootPage } from "../pages/_index.tsx";
import { authProvider } from "../provides/auth.ts";
import { getLocationPath } from "../libs/libs.ts";

const clientLoader = () => {
	// ログインしている場合、rootルートは常にauthProviderを返す
	return { user: authProvider.username, isAuth: authProvider.isAuthenticated };
};

const handle = {
	crumb: (match: { pathname: string }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}` },
			active: getLocationPath() === match.pathname,
		};
		const label = (
			<>
				<i className={"bi bi-house-door-fill me-1"}></i>Home
			</>
		);
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

export function RootRoute(): JSX.Element {
	return <RootPage />;
}

RootRoute.loader = clientLoader;
RootRoute.handle = handle;
