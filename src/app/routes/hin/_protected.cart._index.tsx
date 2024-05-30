import { ActionFunctionArgs, LoaderFunctionArgs, defer, redirect } from "react-router-dom";
import { getCart, deleteCart, updateCartNonyu, commitCart, updateCartSuryo } from "../../data/hin/cart.ts";
import { ProtectedCartPage } from "../../pages/hin/_protected.cart._index.tsx";
import { authProvider } from "../../provides/auth.ts";

const route_name = "ProtectedCartRoute";

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth false`), false;

  const search_params = new URL(request.url).searchParams;

  return defer({
    data: await getCart(),
    searchParams: Object.fromEntries(search_params.entries()),
    searchies: [],
    message: route_name,
  });
};

/**
 * Action: handleActionConfirm
 * @returns
 */
const handleActionConfirm = async () => {
  if (!confirm("注文しますか？")) {
    return false;
  }
  await commitCart();
  return redirect("/cart/commit");
};

/**
 * Action: handleActionEdit
 * @param formData
 * @returns
 */
const handleActionEdit = async (formData: FormData) => {
  if (!formData.get("nonyu_no")) {
    alert("納入番号が入力されていません");
    return false;
  }
  await updateCartNonyu(formData);
  return redirect("/cart/confirm");
};

/**
 * Action: handleActionFormSuryo
 * @param formData
 * @returns
 */
const handleActionFormSuryo = async (formData: FormData) => {
  if (!formData.get("suryo")) {
    alert("数量が入力されていません");
    return false;
  }
  await updateCartSuryo(formData);
  return true;
};

/**
 * Action: handleActionFormDelete
 * @param formData
 * @returns
 */
const handleActionFormDelete = async (formData: FormData) => {
  if (!confirm("ご注文商品の取消：選択行を削除しますか？")) {
    return false;
  }
  await deleteCart(formData);
  return true;
};

const clientAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const mode = formData.get("mode");

  switch (mode) {
    case "confirm":
      return handleActionConfirm();
    case "edit":
      return handleActionEdit(formData);
    case "form_suryo":
      return handleActionFormSuryo(formData);
    case "form_delete":
      return handleActionFormDelete(formData);
    default:
      // modeが空の場合の処理。
      alert("Error! mode not found");
      return false;
  }
};

export function ProtectedCartRoute(): JSX.Element {
  return <ProtectedCartPage />;
}

ProtectedCartRoute.loader = clientLoader;
ProtectedCartRoute.action = clientAction;
