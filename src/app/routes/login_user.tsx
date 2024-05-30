import { ActionFunctionArgs, redirect, LoaderFunctionArgs } from "react-router-dom";
import { FormType } from "../components/createForm.tsx";
import { CrumbItem, Match } from "../components/breadcrumbs.tsx";
import { getLocationPath } from "../libs/libs.ts";
import { LoginUserPage } from "../pages/login_user.tsx";
import { authProvider } from "../provides/auth.ts";

const route_name = "LoginHinRoute";

const getForms = async (): Promise<FormType[]> => {
  return [
    {
      type: "email",
      controlId: "email",
      name: "email",
      label: "Mail Address:",
      placeholder: "email",
      required: true,
      invalidMessage: "You must provide a Mail Address to log in",
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
      email: string;
      password: string;
      redirectTo: string;
      loginType: string;
    };
  };
  // ユーザー名とパスワードの検証を行う
  const validateInput = ({ email, password }: { email: string; password: string }) => {
    return !email || !password ? { error: "You must provide a Mail Address and password to log in" } : null;
  };
  // サインインを行う
  const signInUser = async (email: string, password: string, type: string) => {
    try {
      await authProvider.signInUser(email, password, type);
      return null;
    } catch (error) {
      return {
        error: "Invalid login attempt",
      };
    }
  };
  // リダイレクトを行う
  const redirectTo = (redirectTo: string) => {
    console.log("LoginRoute redirectTo", redirectTo);

    // return redirectTo === "/" ? redirect("/mypage_admin") : redirect(redirectTo || "/");
    return redirectTo === "/" ? redirect("/mypage") : redirect(redirectTo || "/");
  };

  const formData = await getFormData(request);
  const validationError = validateInput(formData);
  const signInError = !validationError ? await signInUser(formData.email, formData.password, formData.loginType) : (console.log("LoginRoute signInError"), null);

  // バリデーションエラーまたはサインインエラーがある場合はエラーメッセージを返す
  return validationError || signInError || redirectTo(formData.redirectTo);
};

const handle = {
  crumb: (match: Match<unknown>): JSX.Element => (
    <CrumbItem props={{ linkProps: { to: `${match.pathname}`, end: true }, active: getLocationPath() === match.pathname }} label={<>{"Login"}</>} />
  ),
};

export function LoginUserRoute(): JSX.Element {
  return <LoginUserPage />;
}

LoginUserRoute.loader = clientLoader;
LoginUserRoute.action = clientAction;
LoginUserRoute.handle = handle;
