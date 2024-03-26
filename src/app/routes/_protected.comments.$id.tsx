import { NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getComments } from "../data/jsonplaceholder/getComments";
import { ProtectedCommentsIdPage } from "../pages/_protected.comments.$id";
import { authProvider } from "../provides/auth";

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getComments(params.id) } : null;
};

const handle = {
	crumb: (match: { pathname: string; data: { data: { id: string; name: string } } }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}` },
			active: location.pathname === match.pathname,
		};
		const label = match.data.data.name;
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

export function ProtectedCommentsIdRoute(): JSX.Element {
	return <ProtectedCommentsIdPage />;
}

ProtectedCommentsIdRoute.loader = clientLoader;
ProtectedCommentsIdRoute.handle = handle;
