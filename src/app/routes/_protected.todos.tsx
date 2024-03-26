import { getTodos } from "../data/jsonplaceholder/getTodos";
import { ProtectedTodosPage } from "../pages/_protected.todos";
import { authProvider } from "../provides/auth";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getTodos() } : null;
};

export function ProtectedTodosRoute(): JSX.Element {
	return <ProtectedTodosPage />;
}

ProtectedTodosRoute.loader = clientLoader;
