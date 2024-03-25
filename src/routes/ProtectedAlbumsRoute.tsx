import { LoaderFunctionArgs } from "react-router-dom";
import { getAlbums } from "../data/jsonplaceholder/getAlbums";
import { ProtectedAlbumsPage } from "../pages/ProtectedAlbumsPage";
import { authProvider } from "../provides/auth";
import { getUsers } from "../data/jsonplaceholder/getUsers";

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: getAlbums(searchParams), searchParams, users: getUsers() } : null;
};

export function ProtectedAlbumsRoute() {
	return <ProtectedAlbumsPage />;
}

ProtectedAlbumsRoute.loader = clientLoader;
