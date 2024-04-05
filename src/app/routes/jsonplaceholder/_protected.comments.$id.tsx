import { NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getComments } from "../../data/jsonplaceholder/comments.ts";
import { ProtectedCommentsIdPage } from "../../pages/jsonplaceholder/_protected.comments.$id.tsx";
import { authProvider } from "../../provides/auth.ts";
import { FormType } from "../../components/CreateForm.tsx";
import { getPosts } from "../../data/jsonplaceholder/posts.ts";
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
			controlId: "name",
			name: "name",
			label: "Name:",
			placeholder: "Name",
		},
		{
			type: "text",
			controlId: "email",
			name: "email",
			label: "Email:",
			placeholder: "Email",
		},
		{
			type: "text",
			controlId: "body",
			name: "body",
			label: "Body:",
			placeholder: "Body",
		},
		{
			as: "select",
			controlId: "postId",
			name: "postId",
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
