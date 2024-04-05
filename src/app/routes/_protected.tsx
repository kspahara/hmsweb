import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authProvider } from "../provides/auth";
import { getLocationPath } from "../libs/libs";

export const clientLoader = ({ request }: LoaderFunctionArgs) => {
	const isAuth = authProvider.isAuthenticated;
	const pathWithoutBase = getLocationPath(request);
	// console.log(pathWithoutBase);
	// ログインしていないユーザーが`/protected`にアクセスしようとした場合`/login`にリダイレクトする
	// リダイレクト先にはログイン後にアクセスしようとしたページのパスを含める
	return !isAuth ? redirect(`/login?from=${pathWithoutBase}`) : { message: "Protected Layout" };
};
