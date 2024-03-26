import { LoaderFunctionArgs } from "react-router-dom";
import { getAlbums } from "../data/jsonplaceholder/getAlbums";
import { getUsers } from "../data/jsonplaceholder/getUsers";
import { ProtectedAlbumsPage } from "../pages/_protected.albums._index";
import { authProvider } from "../provides/auth";

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
