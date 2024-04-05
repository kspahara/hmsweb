import { LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/CreateForm";
import { getAlbums } from "../../data/jsonplaceholder/albums";
import { getUsers } from "../../data/jsonplaceholder/users";
import { ProtectedAlbumsPage } from "../../pages/jsonplaceholder/_protected.albums._index";
import { authProvider } from "../../provides/auth";

const getForms = async () => {
	const forms: FormType[] = [
		{
			type: "input",
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

const getSearchParam = async (searchParams: URLSearchParams) => {
	const forms = await getForms();
	const searchParams_key: Record<string, string> = {};
	forms.forEach((form) => {
		searchParams_key[form.controlId] = searchParams.get(form.controlId) || "";
	});

	return searchParams_key;
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const isAuth = authProvider.isAuthenticated;

	return isAuth
		? defer({ data: getAlbums(searchParams), searchParams: await getSearchParam(searchParams), forms: await getForms(), users: getUsers(), message: "Albums" })
		: null;
};

export function ProtectedAlbumsRoute() {
	return <ProtectedAlbumsPage />;
}

ProtectedAlbumsRoute.loader = clientLoader;
