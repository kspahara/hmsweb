import { getUsers } from "../../data/jsonplaceholder/users.ts";
import { ProtectedUsersPage } from "../../pages/jsonplaceholder/_protected.users.tsx";
import { authProvider } from "../../provides/auth.ts";

const clientLoader = async () => {
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? { data: await getUsers() } : null;
};

export function ProtectedUsersRoute(): JSX.Element {
	return <ProtectedUsersPage />;
}

ProtectedUsersRoute.loader = clientLoader;
