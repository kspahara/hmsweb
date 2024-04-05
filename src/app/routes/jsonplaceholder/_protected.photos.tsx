import { getPhotos } from "../../data/jsonplaceholder/photos";
import { ProtectedPhotosPage } from "../../pages/jsonplaceholder/_protected.photos";
import { authProvider } from "../../provides/auth";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getPhotos() } : null;
};

export function ProtectedPhotosRoute(): JSX.Element {
	return <ProtectedPhotosPage />;
}

ProtectedPhotosRoute.loader = clientLoader;
