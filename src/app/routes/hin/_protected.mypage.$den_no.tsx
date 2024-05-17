import { LoaderFunctionArgs } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { FormType } from "../../components/createForm.tsx";
import { getDenDetail } from "../../data/hin/mypage.ts";
// import { getUserDetailCond } from "../../data/hin/users.ts";
import { ProtectedMypageDenNoPage } from "../../pages/hin/_protected.mypage.$den_no.tsx";
import { authProvider } from "../../provides/auth.ts";
import { getLocationPath } from "../../libs/libs.ts";

const route_name = "ProtectedMypageIdRoute";

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
			controlId: "title",
			name: "title",
			label: "Title:",
			placeholder: "Title",
		},
		{
			as: "select",
			controlId: "userId",
			name: "userId",
			label: "UserId:",
			placeholder: "Select UserId",
			ariaLabel: "UserId",
			optionKey: { key: "id", value: "name" },
		},
	];
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth`), false;

	const [data, forms, searchies] = await Promise.all([getDenDetail(params.den_no || ""), getForms(), []]);

	return {
		data,
		forms,
		searchies,
		message: route_name,
	};
};

const handle = {
	crumb: (match: Match<{ title: string }>): JSX.Element => (
		<CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.title}</>} />
	),
};

export function ProtectedMypageDenNoRoute(): JSX.Element {
	return <ProtectedMypageDenNoPage />;
}

ProtectedMypageDenNoRoute.loader = clientLoader;
ProtectedMypageDenNoRoute.handle = handle;
