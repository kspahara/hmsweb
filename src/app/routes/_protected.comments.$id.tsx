import { NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { getComments } from "../data/jsonplaceholder/comments";
import { ProtectedCommentsIdPage } from "../pages/_protected.comments.$id";
import { authProvider } from "../provides/auth";
import { Form } from "../components/Forms";

const getForms = async (): Promise<Form[]> => {
	const forms = [
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
	];
	return forms;
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const [data, forms] = await Promise.all([getComments(params.id), getForms()]);

	return isAuth ? { data, forms } : null;
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
