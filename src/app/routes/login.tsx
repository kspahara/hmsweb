import { ActionFunctionArgs, redirect, NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { authProvider } from "../provides/auth.ts";
import { LoginPage } from "../pages/login.tsx";
import { FormType } from "../components/CreateForm.tsx";
import { getLocationPath } from "../libs/libs.ts";

const getForms = async () => {
	const forms: FormType[] = [
		{
			type: "text",
			controlId: "username",
			name: "username",
			label: "Username:",
			placeholder: "username",
			required: true,
			invalidMessage: "You must provide a username to log in",
		},
		{
			type: "password",
			controlId: "password",
			name: "password",
			label: "Password:",
			placeholder: "password",
			autoComplete: "false",
			required: true,
			invalidMessage: "You must provide a password to log in",
		},
	];
	return forms;
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? redirect("/") : { searchParams, forms: await getForms(), message: "Login Page" };
};

const clientAction = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const username: string | null = formData.get("username") as string | null;
	// 隠しformのredirectToフィールドからリダイレクト先を取得する
	const redirectTo = formData.get("redirectTo") as string | null;
	// フォームの入力を検証し、useActionData() で検証エラーを返す
	if (!username) {
		return {
			error: "You must provide a username to log in",
		};
	}
	// サインインし、成功すれば適切な宛先にリダイレクトする
	try {
		await authProvider.signin(username);
	} catch (error) {
		// TODO ここで無効なユーザー名とパスワードの組み合わせを処理する
		// この例では、常にエラーを返している
		return {
			error: "Invalid login attempt",
		};
	}

	return redirect(redirectTo || "/");
};

const handle = {
	crumb: (match: { pathname: string }): JSX.Element => {
		const props = {
			linkAs: NavLink,
			linkProps: { to: `${match.pathname}`, end: true },
			active: getLocationPath() === match.pathname,
		};
		const label = "Login";
		return <Breadcrumb.Item {...props}>{label}</Breadcrumb.Item>;
	},
};

export function LoginRoute(): JSX.Element {
	return <LoginPage />;
}

LoginRoute.loader = clientLoader;
LoginRoute.action = clientAction;
LoginRoute.handle = handle;
