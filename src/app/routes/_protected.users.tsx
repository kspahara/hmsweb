import { getUsers } from "../data/jsonplaceholder/users";
import { ProtectedUsersPage } from "../pages/_protected.users";
import { authProvider } from "../provides/auth";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getUsers() } : null;
};

export function ProtectedUsersRoute(): JSX.Element {
	return <ProtectedUsersPage />;
}

ProtectedUsersRoute.loader = clientLoader;
