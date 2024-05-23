import { ActionFunctionArgs, LoaderFunctionArgs, defer, redirect } from "react-router-dom";
import { FormType } from "../../components/createForm.tsx";
// import { getMypageAdmin } from "../../data/hin/mypage_admin.ts";
import { ProtectedMypageAdminPage } from "../../pages/hin/_protected.mypage_admin._index.tsx";
import { authProvider } from "../../provides/auth.ts";

const route_name = "ProtectedMypageAdminRoute";

// TODO
const getForms = async (): Promise<FormType[]> => {
  return [
    {
      type: "search",
      controlId: "tok_nm",
      name: "tok_nm",
      label: "得意先名:",
      placeholder: "得意先名",
    },
  ];
};

// TODO
const getTokui = async () => {
  const data = [
    {
      tok_cd: "00030",
      tok_nm: "株式会社ブロッサム九州",
    },
    {
      tok_cd: "00066",
      tok_nm: "栗田書店",
    },
    {
      tok_cd: "07506",
      tok_nm: "志進塾（小野市)",
    },
    {
      tok_cd: "07824",
      tok_nm: "学習教室 サクセス 昆陽教室(伊丹市)",
    },
  ];
  return data.map((item) => ({
    id: item.tok_cd,
    title: item.tok_nm,
  }));
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth false`), false;

  const search_params = new URL(request.url).searchParams;

  return defer({
    data: getTokui(),
    searchParams: Object.fromEntries(search_params.entries()),
    forms: await getForms(),
    searchies: [],
    message: route_name,
  });
};

const clientAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  await authProvider.changeTokui(formData.get("tok_cd") as string);

  return redirect("/mypage");
};

export function ProtectedMypageAdminRoute(): JSX.Element {
  return <ProtectedMypageAdminPage />;
}

ProtectedMypageAdminRoute.loader = clientLoader;
ProtectedMypageAdminRoute.action = clientAction;
