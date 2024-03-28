import { NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getComments } from "../data/jsonplaceholder/comments";
import { ProtectedCommentsIdPage } from "../pages/_protected.comments.$id";
import { authProvider } from "../provides/auth";
import { Form } from "../components/Forms";
import { getPosts } from "../data/jsonplaceholder/posts";

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
			controlId: "name",
			label: "Name:",
			placeholder: "Name",
		},
		{
			type: "text",
			controlId: "email",
			label: "Email:",
			placeholder: "Email",
		},
		{
			type: "text",
			controlId: "body",
			label: "Body:",
			placeholder: "Body",
		},
		{
			as: "select",
			controlId: "postId",
			label: "PostId:",
			placeholder: "Select PostId",
			ariaLabel: "PostId",
			optionKey: { key: "id", value: "title" },
		},
	];
	return forms;
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const [data, forms, posts] = await Promise.all([getComments(params.id), getForms(), getPosts()]);

	return isAuth ? { data, forms, posts } : null;
};

const handle = {
	crumb: (match: { pathname: string; data: { data: { id: string; name: string } } }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}` },
			active: location.pathname === match.pathname,
		};
		const label = match.data.data.name;
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

export function ProtectedCommentsIdRoute(): JSX.Element {
	return <ProtectedCommentsIdPage />;
}

ProtectedCommentsIdRoute.loader = clientLoader;
ProtectedCommentsIdRoute.handle = handle;
