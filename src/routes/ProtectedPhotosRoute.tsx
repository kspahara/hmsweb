import { getPhotos } from "../data/jsonplaceholder/getPhotos";
import { ProtectedPhotosPage } from "../pages/ProtectedPhotosPage";
import { authProvider } from "../provides/auth";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getPhotos() } : null;
};

export function ProtectedPhotosRoute(): JSX.Element {
	return <ProtectedPhotosPage />;
}

ProtectedPhotosRoute.loader = clientLoader;
