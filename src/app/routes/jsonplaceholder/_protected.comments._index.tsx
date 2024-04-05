import { getComments } from "../../data/jsonplaceholder/comments";
import { ProtectedCommentsPage } from "../../pages/jsonplaceholder/_protected.comments._index";
import { authProvider } from "../../provides/auth";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getComments() } : null;
};

export function ProtectedCommentsRoute(): JSX.Element {
	return <ProtectedCommentsPage />;
}

ProtectedCommentsRoute.loader = clientLoader;
