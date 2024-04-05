import { NavLink, LoaderFunctionArgs, redirect } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { Form } from "../../components/FloatingForms";
import { getAlbumDetail } from "../../data/jsonplaceholder/albums";
import { updateAlbum } from "../../data/jsonplaceholder/albums";
import { getUsers } from "../../data/jsonplaceholder/users";
import { ProtectedAlbumsIdPage } from "../../pages/jsonplaceholder/_protected.albums.$id";
import { authProvider } from "../../provides/auth";

const getForms = async () => {
	const forms: Form[] = [
		{
			type: "number",
			controlId: "id",
			label: "Id:",
			placeholder: "Id",
			disabled: true,
			readOnly: true,
			plaintext: true,
		},
		{
			type: "text",
			controlId: "title",
			label: "Title:",
			placeholder: "Title",
		},
		{
			as: "select",
			controlId: "userId",
			label: "UserId:",
			placeholder: "Select UserId",
			ariaLabel: "UserId",
			optionKey: { key: "id", value: "name" },
		},
	];
	return forms;
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const [data, forms, users] = await Promise.all([getAlbumDetail(params.id), getForms(), getUsers()]);

	return isAuth ? { data, forms, users, message: "ProtectedAlbumsIdPage" } : null;
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
