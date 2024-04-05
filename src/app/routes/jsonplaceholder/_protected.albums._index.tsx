import { LoaderFunctionArgs, defer } from "react-router-dom";
import { Form } from "../../components/FloatingForms";
import { getAlbums } from "../../data/jsonplaceholder/albums";
import { getUsers } from "../../data/jsonplaceholder/users";
import { ProtectedAlbumsPage } from "../../pages/jsonplaceholder/_protected.albums._index";
import { authProvider } from "../../provides/auth";

const getForms = async () => {
	const forms: Form[] = [
		{
			as: "select",
			controlId: "userId",
			label: "User:",
			placeholder: "All Users",
			ariaLabel: "UserId",
			optionKey: { key: "id", value: "name" },
		},
	];
	return forms;
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? defer({ data: getAlbums(searchParams), searchParams, forms: await getForms(), users: getUsers() }) : null;
};

export function ProtectedAlbumsRoute() {
	return <ProtectedAlbumsPage />;
}

ProtectedAlbumsRoute.loader = clientLoader;
