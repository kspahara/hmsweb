import { PublicPage } from "../pages/PublicPage";

const clientLoader = async () => {
	return { message: "Public Page Home" };
};

export function PublicRoute(): JSX.Element {
	return <PublicPage />;
}

PublicRoute.loader = clientLoader;
