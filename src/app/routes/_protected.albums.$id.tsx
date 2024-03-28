import { NavLink, LoaderFunctionArgs, redirect } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getAlbumDetail } from "../data/jsonplaceholder/albums";
import { updateAlbum } from "../data/jsonplaceholder/albums";
import { ProtectedAlbumsIdPage } from "../pages/_protected.albums.$id";
import { authProvider } from "../provides/auth";
import { Form } from "../components/Forms";

const getForms = async (): Promise<Form[]> => {
	const forms = [
		{
			type: "text",
			controlId: "title",
			label: "Title:",
			placeholder: "Title",
		},
		{
			type: "text",
			controlId: "userId",
			label: "UserId:",
			placeholder: "UserId",
		},
		{
			type: "text",
			controlId: "id",
			label: "Id:",
			placeholder: "Id",
		},
	];
	return forms;
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const [data, forms] = await Promise.all([getAlbumDetail(params.id), getForms()]);

	return isAuth ? { data, forms } : null;
};

const clientAction = async ({ params, request }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const body = new URLSearchParams(await request.text());
	isAuth && (await updateAlbum({ id: params.id, title: body.get("title"), userId: body.get("userId") }));

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
