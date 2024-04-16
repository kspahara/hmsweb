import { LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/createForm";
import { getComments } from "../../data/jsonplaceholder/comments";
import { ProtectedCommentsPage } from "../../pages/jsonplaceholder/_protected.comments._index";
import { authProvider } from "../../provides/auth";
import { getPostsCond } from "../../data/jsonplaceholder/posts";

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
			controlId: "postId",
			name: "postId",
			label: "Post:",
			placeholder: "Select Post",
			ariaLabel: "PostId",
			optionKey: { key: "id", value: "title" },
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
		searchies: getPostsCond(),
		message: route_name,
	});
};

export function ProtectedCommentsRoute(): JSX.Element {
	return <ProtectedCommentsPage />;
}

ProtectedCommentsRoute.loader = clientLoader;
