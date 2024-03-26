import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../../provides/auth";
import { ProtectedRoutePage } from "../../pages/ProtectedRoutePage";

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	// ログインしていないユーザーが`/protected`にアクセスしようとした場合`/login`にリダイレクトする
	return !isAuth ? redirect(`/login?from=${new URL(request.url).pathname}`) : null;
};

export function ProtectedRoute(): JSX.Element {
	return <ProtectedRoutePage />;
}

ProtectedRoute.loader = clientLoader;
