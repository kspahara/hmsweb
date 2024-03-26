import { NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getAlbumDetail } from "../data/jsonplaceholder/getAlbumDetail";
import { ProtectedAlbumsIdPage } from "../pages/_protected.albums.$id";
import { authProvider } from "../provides/auth";

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getAlbumDetail(params.id) } : null;
};

const handle = {
	crumb: (match: { pathname: string; data: { data: { title: string } } }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}` },
			active: location.pathname === match.pathname,
		};
		const label = match.data.data.title;
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

export function ProtectedAlbumsIdRoute(): JSX.Element {
	return <ProtectedAlbumsIdPage />;
}

ProtectedAlbumsIdRoute.loader = clientLoader;
ProtectedAlbumsIdRoute.handle = handle;
