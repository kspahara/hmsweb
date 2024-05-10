import { getPhotos } from "../../data/jsonplaceholder/photos.ts";
import { ProtectedPhotosPage } from "../../pages/jsonplaceholder/_protected.photos.tsx";
import { authProvider } from "../../provides/auth.ts";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getPhotos() } : null;
};

export function ProtectedPhotosRoute(): JSX.Element {
	return <ProtectedPhotosPage />;
}

ProtectedPhotosRoute.loader = clientLoader;
