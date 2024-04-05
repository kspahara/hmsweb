import { NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getComments } from "../../data/jsonplaceholder/comments";
import { ProtectedCommentsIdPage } from "../../pages/jsonplaceholder/_protected.comments.$id";
import { authProvider } from "../../provides/auth";
import { Form } from "../../components/FloatingForms";
import { getPosts } from "../../data/jsonplaceholder/posts";
import { getLocationPath } from "../../libs/libs";

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
			active: getLocationPath() === match.pathname,
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