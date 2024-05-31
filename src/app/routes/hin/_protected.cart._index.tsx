import { ActionFunctionArgs, LoaderFunctionArgs, defer, redirect } from "react-router-dom";
import { getCart, deleteCart, updateCartNonyu, commitCart, updateCartSuryo } from "../../data/hin/cart.ts";
import { ProtectedCartPage } from "../../pages/hin/_protected.cart._index.tsx";
import { authProvider } from "../../provides/auth.ts";
import { Field } from "./_protected.mypage._index.tsx";
import { parseInttoStr } from "../../libs/libs.ts";

const route_name = "ProtectedCartRoute";

export type FieldsNav = {
  to: string;
  label: string;
  className?: string;
};

type Fields = {
  navigation: FieldsNav[];
  nonyu: Field[];
  cart: Field[];
  cart_fixed: Field[];
  nonyu_head: Field[];
};

const getFields = async (): Promise<Fields> => {
  const fields = {
    navigation: [
      { to: "/cart", label: "Cart", className: "rounded-start border-end-0" },
      { to: "/cart/edit", label: "Edit" },
      { to: "/cart/confirm", label: "Confirm", className: "rounded-end border-start-0" },
    ],
    nonyu: [
      { label: "納入先:", key: "nonyu_nm" },
      { label: "住所:", key: "zip_no" },
      { label: "", key: "addr" },
      { label: "TEL:", key: "tel_no" },
    ],
    cart: [
      { label: "商品:", key: "hin_cd" },
      { label: "", key: "hin_nm" },
      { label: "単価:", key: "tanka", format: (value: string) => `¥${parseInttoStr(value)}` },
    ],
    cart_fixed: [
      { label: "商品:", key: "hin_cd" },
      { label: "", key: "hin_nm" },
      { label: "単価:", key: "tanka", format: (value: string) => `¥${parseInttoStr(value)}` },
      { label: "数量:", key: "suryo", format: (value: string) => parseInttoStr(value) },
      { label: "小計:", key: "kingaku", format: (value: string) => `¥${parseInttoStr(value)}` },
    ],
    nonyu_head: [
      { label: "納入先名:", key: "nonyu_nm" },
      { label: "住所:", key: "nonyu_zip_no" },
      { label: "", key: "nonyu_addr1" },
      { label: "", key: "nonyu_addr2" },
      { label: "", key: "nonyu_addr3" },
      { label: "", key: "nonyu_addr4" },
      { label: "TEL:", key: "nonyu_tel_no" },
    ],
  };

  return {
    navigation: fields.navigation,
    nonyu: fields.nonyu,
    cart: fields.cart,
    cart_fixed: fields.cart_fixed,
    nonyu_head: fields.nonyu_head,
  };
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth false`), false;

  const search_params = new URL(request.url).searchParams;

  return defer({
    data: await getCart(),
    searchParams: Object.fromEntries(search_params.entries()),
    searchies: [],
    message: route_name,
    fields: await getFields(),
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
