import { LoaderFunctionArgs } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { FormType } from "../../components/createForm.tsx";
import { getPostDetailCond } from "../../data/jsonplaceholder/posts.ts";
import { getCommentsDetail } from "../../data/jsonplaceholder/comments.ts";
import { ProtectedCommentsIdPage } from "../../pages/jsonplaceholder/_protected.comments.$id.tsx";
import { authProvider } from "../../provides/auth.ts";
import { getLocationPath } from "../../libs/libs.ts";

const route_name = "ProtectedCommentsIdRoute";

const getForms = async (): Promise<FormType[]> => {
	return [
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
			placeholder: "Select Post",
			ariaLabel: "PostId",
			optionKey: { key: "id", value: "title" },
		},
	];
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth`), false;

	const [data, forms, searchies] = await Promise.all([getCommentsDetail(params.id || ""), getForms(), getPostDetailCond()]);

	return {
		data,
		forms,
		searchies,
		message: route_name,
	};
};

/**
 *
 * @param match
 * @returns
 */
const createCrumb = (match: Match<{ name: string }>): JSX.Element => (
	<CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.name}</>} />
);

const handle = {
	crumb: createCrumb,
};

export function ProtectedCommentsIdRoute(): JSX.Element {
	return <ProtectedCommentsIdPage />;
}

ProtectedCommentsIdRoute.loader = clientLoader;
ProtectedCommentsIdRoute.handle = handle;
