import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getAlbums } from "../data/jsonplaceholder/albums";
import { getUsers } from "../data/jsonplaceholder/users";
import { ProtectedAlbumsPage } from "../pages/_protected.albums._index";
import { authProvider } from "../provides/auth";

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? defer({ data: getAlbums(searchParams), searchParams, users: getUsers() }) : null;
};

export function ProtectedAlbumsRoute() {
	return <ProtectedAlbumsPage />;
}

ProtectedAlbumsRoute.loader = clientLoader;
