import { getPosts } from "../../data/jsonplaceholder/posts";
import { ProtectedPostsPage } from "../../pages/jsonplaceholder/_protected.posts";
import { authProvider } from "../../provides/auth";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getPosts() } : null;
};

export function ProtectedPostsRoute(): JSX.Element {
	return <ProtectedPostsPage />;
}

ProtectedPostsRoute.loader = clientLoader;
