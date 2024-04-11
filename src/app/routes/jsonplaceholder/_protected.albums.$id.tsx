import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { FormType } from "../../components/createForm.tsx";
import { getAlbumDetail } from "../../data/jsonplaceholder/albums.ts";
import { updateAlbum } from "../../data/jsonplaceholder/albums.ts";
import { getUsers } from "../../data/jsonplaceholder/users.ts";
import { ProtectedAlbumsIdPage } from "../../pages/jsonplaceholder/_protected.albums.$id.tsx";
import { authProvider } from "../../provides/auth.ts";
import { getLocationPath } from "../../libs/libs.ts";

const route_name = "ProtectedAlbumsIdRoute";

const getForms = async (): Promise<FormType[]> => {
	return [
		{
			type: "number",
			controlId: "id",
			name: "id",
			label: "Id:",
			placeholder: "Id",
			disabled: true,
			readOnly: true,
			plaintext: true,
		},
		{
			type: "text",
			controlId: "title",
			name: "title",
			label: "Title:",
			placeholder: "Title",
		},
		{
			as: "select",
			controlId: "userId",
			name: "userId",
			label: "UserId:",
			placeholder: "Select UserId",
			ariaLabel: "UserId",
			optionKey: { key: "id", value: "name" },
		},
	];
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth`), false;

	const [data, forms, users] = await Promise.all([getAlbumDetail(params.id), getForms(), getUsers()]);

	return {
		data,
		forms,
		users,
		message: "ProtectedAlbumsIdPage",
	};
};

const clientAction = async ({ params, request }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return false;

	console.log("ProtectedAlbumsIdRoute clientAction (protected.albums.id) isAuth");
	const body = new URLSearchParams(await request.text());
	await updateAlbum({
		id: params.id,
		title: body.get("title"),
		userId: body.get("userId"),
	});

	return redirect(`/albums/${params.id}`);
};

const createCrumb = (match: Match<{ title: string }>): JSX.Element => (
	<CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.title}</>} />
);

const handle = {
	crumb: createCrumb,
};

export function ProtectedAlbumsIdRoute(): JSX.Element {
	return <ProtectedAlbumsIdPage />;
}

ProtectedAlbumsIdRoute.loader = clientLoader;
ProtectedAlbumsIdRoute.action = clientAction;
ProtectedAlbumsIdRoute.handle = handle;
