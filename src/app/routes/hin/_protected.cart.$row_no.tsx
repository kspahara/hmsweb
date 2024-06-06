import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { ProtectedCartRowNoRoutePage } from "../../pages/hin/_protected.cart.$row_no.tsx";
import { getLocationPath } from "../../libs/libs.ts";
import { getCartDetail, updateCartDetail } from "../../data/hin/cart.ts";
import { FormType } from "../../components/createForm.tsx";

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const data = await getCartDetail(params.row_no as string);
  const forms = data.detail.specs.map(
    (spec: Record<string, string>): FormType => ({
      type: spec.type === "string" ? "text" : spec.type === "multiline" ? "textarea" : spec.type,
      controlId: spec.type === "select" ? spec.code_kbn : spec.id,
      name: spec.id,
      label: spec.title,
      placeholder: spec.title,
      defaultValue: spec.value,
      as: spec.type === "select" ? spec.type : spec.type === "multiline" ? "textarea" : undefined,
      optionKey: spec.type === "select" ? { key: "han_cd", value: "han_name" } : undefined,
    })
  );
  const searchies = data.detail.code_lists;

  return {
    data,
    message: "カートの詳細を表示します。",
    forms,
    searchies,
  };
};

const clientAction = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  if (!confirm("登録しますか？")) {
    return false;
  }
  await updateCartDetail(params.row_no as string, formData);

  return redirect("/cart");
};

const handle = {
  crumb: (match: Match<{ detail: { hin_nm: string } }>) => (
    <CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.detail.hin_nm}</>} />
  ),
};

/**
 * HinDetailRoute
 * @returns
 */
export function ProtectedCartRowNoRoute(): JSX.Element {
  return <ProtectedCartRowNoRoutePage />;
}

ProtectedCartRowNoRoute.loader = clientLoader;
ProtectedCartRowNoRoute.action = clientAction;
ProtectedCartRowNoRoute.handle = handle;
