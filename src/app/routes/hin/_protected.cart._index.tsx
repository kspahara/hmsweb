import { ActionFunctionArgs, LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/createForm.tsx";
import { getCart, deleteCart } from "../../data/hin/cart.ts";
import { ProtectedCartPage } from "../../pages/hin/_protected.cart._index.tsx";
import { authProvider } from "../../provides/auth.ts";

const route_name = "ProtectedCartRoute";

// TODO
const getForms = async (): Promise<FormType[]> => {
	return [];
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth false`), false;

	const search_params = new URL(request.url).searchParams;

	return defer({
		data: await getCart(),
		searchParams: Object.fromEntries(search_params.entries()),
		forms: await getForms(),
		searchies: [],
		message: route_name,
	});
};

const clientAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const massage = "削除しますか？";

	// TODO
	return confirm(massage) && (await deleteCart(formData));
};

export function ProtectedCartRoute(): JSX.Element {
	return <ProtectedCartPage />;
}

ProtectedCartRoute.loader = clientLoader;
ProtectedCartRoute.action = clientAction;
