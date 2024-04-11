import { LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/CreateForm";
import { getAlbums } from "../../data/jsonplaceholder/albums";
import { getUsers } from "../../data/jsonplaceholder/users";
import { ProtectedAlbumsPage } from "../../pages/jsonplaceholder/_protected.albums._index";
import { authProvider } from "../../provides/auth";

const route_name = "ProtectedAlbumsRoute";

// TODO
const getForms = async (): Promise<FormType[]> => {
	return [
		{
			type: "search",
			controlId: "title",
			name: "title",
			label: "Title:",
			placeholder: "Title",
		},
		{
			as: "select",
			controlId: "userId",
			name: "userId",
			label: "User:",
			placeholder: "All Users",
			ariaLabel: "UserId",
			optionKey: { key: "id", value: "name" },
		},
	];
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth false`), false;

	const search_params = new URL(request.url).searchParams;

	return defer({
		data: getAlbums(search_params),
		searchParams: Object.fromEntries(search_params.entries()),
		forms: await getForms(),
		searchies: getUsers(),
		message: "Albums",
	});
};

export function ProtectedAlbumsRoute(): JSX.Element {
	return <ProtectedAlbumsPage />;
}

ProtectedAlbumsRoute.loader = clientLoader;
