import { LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/CreateForm";
import { getAlbums } from "../../data/jsonplaceholder/albums";
import { getUser } from "../../data/jsonplaceholder/users";
import { ProtectedAlbumsPage } from "../../pages/jsonplaceholder/_protected.albums._index";
import { authProvider } from "../../provides/auth";

// TODO
const getForms = async () => {
	const forms: FormType[] = [
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
	return forms;
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const search_params = new URL(request.url).searchParams;
	const searchParams = Object.fromEntries(search_params.entries());

	return isAuth ? defer({ data: getAlbums(search_params), searchParams, forms: await getForms(), users: getUser(search_params), message: "Albums" }) : null;
};

export function ProtectedAlbumsRoute(): JSX.Element {
	return <ProtectedAlbumsPage />;
}

ProtectedAlbumsRoute.loader = clientLoader;
