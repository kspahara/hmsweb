import { LoaderFunctionArgs } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { FormType } from "../../components/createForm.tsx";
import { getDenDetail } from "../../data/hin/mypage.ts";
// import { getUserDetailCond } from "../../data/hin/users.ts";
import { ProtectedMypageDenNoPage } from "../../pages/hin/_protected.mypage.$den_no.tsx";
import { authProvider } from "../../provides/auth.ts";
import { getLocationPath } from "../../libs/libs.ts";

const route_name = "ProtectedMypageDenNoRoute";

const getForms = async (): Promise<FormType[]> => {
	return [];
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
	crumb: (match: Match<{ details: { den_no: string }[] }>): JSX.Element => (
		<CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.details[0].den_no}</>} />
	),
};

export function ProtectedMypageDenNoRoute(): JSX.Element {
	return <ProtectedMypageDenNoPage />;
}

ProtectedMypageDenNoRoute.loader = clientLoader;
ProtectedMypageDenNoRoute.handle = handle;
