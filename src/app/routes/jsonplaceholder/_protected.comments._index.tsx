import { LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/createForm";
import { getComments } from "../../data/jsonplaceholder/comments";
import { ProtectedCommentsPage } from "../../pages/jsonplaceholder/_protected.comments._index";
import { authProvider } from "../../provides/auth";
import { getUsers } from "../../data/jsonplaceholder/users";

const route_name = "ProtectedCommentsRoute";

const getForms = async (): Promise<FormType[]> => {
	return [
		{
			type: "search",
			controlId: "name",
			name: "name",
			label: "Name:",
			placeholder: "Name",
		},
		{
			as: "select",
			controlId: "userId",
			name: "postId",
			label: "User:",
			placeholder: "All Users",
			ariaLabel: "PostId",
			optionKey: { key: "id", value: "name" },
		},
	];
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth`), false;

	const search_params = new URL(request.url).searchParams;

	return defer({
		data: getComments(search_params),
		searchParams: Object.fromEntries(search_params.entries()),
		forms: await getForms(),
		searchies: getUsers(),
		message: "Comments",
	});
};

export function ProtectedCommentsRoute(): JSX.Element {
	return <ProtectedCommentsPage />;
}

ProtectedCommentsRoute.loader = clientLoader;
