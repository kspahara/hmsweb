import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../provides/auth.ts";
import { getLocationPath } from "../libs/libs.ts";

const route_name = "protected";

export const clientLoader = ({ request }: LoaderFunctionArgs) => {
	// ログインしていないユーザーが`/protected`にアクセスしようとした場合`/login`にリダイレクトする
	// リダイレクト先にはログイン後にアクセスしようとしたページのパスを含める
	return !authProvider.isAuthenticated ? (console.log(`${route_name} !isAuth redirect`), redirect(`/login?from=${getLocationPath(request)}`)) : null;
};
