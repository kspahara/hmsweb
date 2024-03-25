import { getUsers } from "../data/jsonplaceholder/getUsers";
import { ProtectedUsersPage } from "../pages/ProtectedUsersPage";
import { authProvider } from "../provides/auth";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getUsers() } : null;
};

export function ProtectedUsersRoute(): JSX.Element {
	return <ProtectedUsersPage />;
}

ProtectedUsersRoute.loader = clientLoader;
