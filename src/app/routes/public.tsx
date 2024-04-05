import { PublicPage } from "../pages/public.tsx";

const clientLoader = () => {
	return { message: "Public Page" };
};

export function PublicRoute(): JSX.Element {
	return <PublicPage />;
}

PublicRoute.loader = clientLoader;
