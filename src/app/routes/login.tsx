import { ActionFunctionArgs, redirect, LoaderFunctionArgs } from "react-router-dom";
import { FormType } from "../components/CreateForm.tsx";
import { CrumbItem } from "../components/CrumbItem.tsx";
import { getLocationPath } from "../libs/libs.ts";
import { LoginPage } from "../pages/login.tsx";
import { authProvider } from "../provides/auth.ts";

const getForms = async (): Promise<FormType[]> => {
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
	const isAuth = authProvider.isAuthenticated;
	const from = new URL(request.url).searchParams.get("from") || "/";

	return isAuth ? redirect("/") : { from, forms: await getForms(), message: "Login Page" };
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

type Match = {
	pathname: string;
};

const createCrumb = (match: Match): JSX.Element => {
	const props = {
		linkProps: { to: `${match.pathname}`, end: true },
		active: getLocationPath() === match.pathname,
	};
	const label = <>{"Login"}</>;

	return <CrumbItem props={props} label={label} />;
};

const handle = {
	crumb: createCrumb,
};

export function LoginRoute(): JSX.Element {
	return <LoginPage />;
}

LoginRoute.loader = clientLoader;
LoginRoute.action = clientAction;
LoginRoute.handle = handle;
