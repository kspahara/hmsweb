import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../provides/auth";

export const clientLoader = ({ request }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	// ログインしていないユーザーが`/protected`にアクセスしようとした場合`/login`にリダイレクトする
	return !isAuth ? redirect(`/login?from=${new URL(request.url).pathname}`) : { message: "Protected Layout" };
};
