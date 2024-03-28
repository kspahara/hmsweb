import { ActionFunctionArgs, redirect, NavLink, LoaderFunctionArgs } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { authProvider } from "../provides/auth";
import { LoginPage } from "../pages/login";
import { Form } from "../components/Forms";

const getForms = async (): Promise<Form[]> => {
	const forms = [
		{
			type: "text",
			controlId: "username",
			label: "Username:",
			placeholder: "username",
			required: true,
		},
		{
			type: "password",
			controlId: "password",
			label: "Password:",
			placeholder: "password",
			autoComplete: "false",
		},
	];
	return forms;
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const isAuth = authProvider.isAuthenticated;

	return isAuth ? redirect("/") : { searchParams, forms: await getForms() };
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
			active: location.pathname === match.pathname,
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
