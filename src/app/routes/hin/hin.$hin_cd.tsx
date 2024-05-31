import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { deleteHinFavorite, getHinDetail, updateHinEntryCart, updateHinFavorite } from "../../data/hin/hin.ts";
import { HinDetailPage } from "../../pages/hin/hin.$hin_cd.tsx";
import { getLocationPath, parseInttoStr } from "../../libs/libs.ts";
import { Field } from "./_protected.mypage._index.tsx";

type Fields = {
  detail: Field[];
};

const getFields = async (): Promise<Fields> => {
  const fields = {
    detail: [
      { label: "商品:", key: "hin_cd" },
      { label: "", key: "hin_nm" },
      { label: "単価:", key: "tanka", format: (value: string) => `¥${parseInttoStr(value)}` },
      { label: "ページ数:", key: "density" },
      { label: "判型:", key: "size_cd" },
      { label: "付属品等:", key: "hosoku1" },
    ],
  };

  return {
    detail: fields.detail,
  };
};

const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  const [fields, data] = await Promise.all([getFields(), getHinDetail(params.hin_cd)]);

  return {
    fields,
    data,
  };
};

const clientAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formType = formData.get("form_type");
  const isFavorite = formType === "favorite";
  const updateFav = isFavorite && formData.get("hin_attr_cd") === "1";
  const deleteFav = isFavorite && formData.get("hin_attr_cd") === "0";
  const isCart = formType === "cart";
  const isUpdateFav = isFavorite && updateFav;
  const isDeleteFav = isFavorite && deleteFav;

  const runAction = isUpdateFav ? await updateHinFavorite(formData) : isDeleteFav ? await deleteHinFavorite(formData) : isCart ? await updateHinEntryCart(formData) : null;

  return runAction;
};

const handle = {
  crumb: (match: Match<{ hin_nm: string }>): JSX.Element => (
    <CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.hin_nm}</>} />
  ),
};

/**
 * HinDetailRoute
 * @returns
 */
export function HinDetailRoute(): JSX.Element {
  return <HinDetailPage />;
}

HinDetailRoute.loader = clientLoader;
HinDetailRoute.action = clientAction;
HinDetailRoute.handle = handle;
