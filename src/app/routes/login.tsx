import { ActionFunctionArgs, redirect, LoaderFunctionArgs } from "react-router-dom";
import { FormType } from "../components/createForm.tsx";
import { CrumbItem, Match } from "../components/breadcrumbs.tsx";
import { getLocationPath } from "../libs/libs.ts";
import { LoginPage } from "../pages/login.tsx";
import { authProvider } from "../provides/auth.ts";

const route_name = "LoginRoute";

const getForms = async (): Promise<FormType[]> => {
  return [
    {
      type: "text",
      controlId: "user_name",
      name: "user_name",
      label: "Username:",
      placeholder: "user_name",
      required: true,
      invalidMessage: "You must provide a user_name to log in",
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
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  if (authProvider.isAuthenticated) return console.log(`${route_name} isAuth`), redirect("/");

  return {
    from: new URL(request.url).searchParams.get("from") || "/",
    forms: await getForms(),
    message: "Login Page",
  };
};

const clientAction = async ({ request }: ActionFunctionArgs) => {
  // フォームデータを取得する
  const getFormData = async (request: Request) => {
    const formData = await request.formData();

    return Object.fromEntries(formData.entries()) as {
      user_name: string;
      password: string;
      redirectTo: string;
    };
  };
  // ユーザー名とパスワードの検証を行う
  const validateInput = ({ user_name, password }: { user_name: string; password: string }) => {
    return !user_name || !password ? { error: "You must provide a user_name and password to log in" } : null;
  };
  // サインインを行う
  const signIn = async (user_name: string) => {
    try {
      await authProvider.signIn(user_name);
      return null;
    } catch (error) {
      return {
        error: "Invalid login attempt",
      };
    }
  };
  // リダイレクトを行う
  const redirectTo = (redirectTo: string) => {
    return redirect(redirectTo || "/");
  };

  const formData = await getFormData(request);
  const validationError = validateInput(formData);
  const signInError = !validationError ? await signIn(formData.user_name) : (console.log("LoginRoute signInError"), null);

  // バリデーションエラーまたはサインインエラーがある場合はエラーメッセージを返す
  return validationError || signInError || redirectTo(formData.redirectTo);
};

const handle = {
  crumb: (match: Match<unknown>): JSX.Element => (
    <CrumbItem props={{ linkProps: { to: `${match.pathname}`, end: true }, active: getLocationPath() === match.pathname }} label={<>{"Login"}</>} />
  ),
};

export function LoginRoute(): JSX.Element {
  return <LoginPage />;
}

LoginRoute.loader = clientLoader;
LoginRoute.action = clientAction;
LoginRoute.handle = handle;
