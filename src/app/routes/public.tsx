import { PublicPage } from "../pages/public";

const clientLoader = async () => {
	return { message: "Public Page" };
};

export function PublicRoute(): JSX.Element {
	return <PublicPage />;
}

PublicRoute.loader = clientLoader;
