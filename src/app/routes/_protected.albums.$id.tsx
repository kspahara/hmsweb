import { NavLink, LoaderFunctionArgs, redirect } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getAlbumDetail } from "../data/jsonplaceholder/getAlbumDetail";
import { updateAlbum } from "../data/jsonplaceholder/Albums";
import { ProtectedAlbumsIdPage } from "../pages/_protected.albums.$id";
import { authProvider } from "../provides/auth";

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getAlbumDetail(params.id) } : null;
};

const clientAction = async ({ params, request }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const body = new URLSearchParams(await request.text());
	const title = body.get("title");
	const userId = body.get("userId");
	console.log("title", title);
	isAuth && (await updateAlbum({ id: params.id, title, userId }));
	return redirect(`/albums/${params.id}`);
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
ProtectedAlbumsIdRoute.action = clientAction;
ProtectedAlbumsIdRoute.handle = handle;
