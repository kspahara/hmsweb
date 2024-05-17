import { LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/createForm.tsx";
import { getMypage } from "../../data/hin/mypage.ts";
// import { getUsersCond } from "../../data/hin/users.ts";
import { ProtectedMypagePage } from "../../pages/hin/_protected.mypage._index.tsx";
import { authProvider } from "../../provides/auth.ts";

const route_name = "ProtectedMypageRoute";

// TODO
const getForms = async (): Promise<FormType[]> => {
	return [
		{
			type: "search",
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

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth false`), false;

	const search_params = new URL(request.url).searchParams;

	return defer({
		data: getMypage(search_params),
		searchParams: Object.fromEntries(search_params.entries()),
		forms: await getForms(),
		searchies: [],
		message: route_name,
	});
};

export function ProtectedMypageRoute(): JSX.Element {
	return <ProtectedMypagePage />;
}

ProtectedMypageRoute.loader = clientLoader;