import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { CrumbItem } from "../../components/CrumbItem.tsx";
import { FormType } from "../../components/CreateForm.tsx";
import { getAlbumDetail } from "../../data/jsonplaceholder/albums.ts";
import { updateAlbum } from "../../data/jsonplaceholder/albums.ts";
import { getUsers } from "../../data/jsonplaceholder/users.ts";
import { ProtectedAlbumsIdPage } from "../../pages/jsonplaceholder/_protected.albums.$id.tsx";
import { authProvider } from "../../provides/auth.ts";
import { getLocationPath } from "../../libs/libs.ts";

const getForms = async () => {
	const forms: FormType[] = [
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

/**
 * @param T
 */
type Match<T> = {
	pathname: string;
	data: {
		data: T;
	};
};

type Title = {
	title: string;
};

const createCrumb = (match: Match<Title>): JSX.Element => {
	const props = {
		linkProps: { to: `${match.pathname}` },
		active: getLocationPath() === match.pathname,
	};
	const label = <>{match.data.data.title}</>;

	return <CrumbItem props={props} label={label} />;
};

const handle = {
	crumb: createCrumb,
};

export function ProtectedAlbumsIdRoute(): JSX.Element {
	return <ProtectedAlbumsIdPage />;
}

ProtectedAlbumsIdRoute.loader = clientLoader;
ProtectedAlbumsIdRoute.action = clientAction;
ProtectedAlbumsIdRoute.handle = handle;
