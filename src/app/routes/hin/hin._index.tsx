import { LoaderFunctionArgs, ActionFunctionArgs, defer } from "react-router-dom";
import { getHinCond } from "../../data/hin/hin_cond.ts";
import { deleteHinFavorite, getHinList, updateHinFavorite, updateHinEntryCart } from "../../data/hin/hin.ts";
import { HinIndexPage } from "../../pages/hin/hin._index.tsx";
import { FormType } from "../../components/createForm.tsx";

const getForms = async (): Promise<FormType[]> => {
  return [
    {
      type: "search",
      controlId: "keyword",
      name: "keyword",
      label: "キーワード検索",
      placeholder: "キーワードで絞り込む",
    },
    {
      as: "select",
      controlId: "cat",
      name: "cat_cd",
      label: "出版社:",
      placeholder: "",
      ariaLabel: "Publisher",
      optionKey: { key: "han_cd", value: "han_name" },
    },
    {
      as: "select",
      controlId: "extcat1",
      name: "ext_cat1_cd",
      label: "種類:",
      placeholder: "",
      ariaLabel: "Type",
      optionKey: { key: "han_cd", value: "han_name" },
    },
    {
      as: "select",
      controlId: "extcat2",
      name: "ext_cat2_cd",
      label: "教材分類:",
      placeholder: "",
      ariaLabel: "TextbookClassification",
      optionKey: { key: "han_cd", value: "han_name" },
    },
    {
      as: "select",
      controlId: "extcat3",
      name: "ext_cat3_cd",
      label: "科目:",
      placeholder: "",
      ariaLabel: "Subject",
      optionKey: { key: "han_cd", value: "han_name" },
    },
    {
      as: "select",
      controlId: "extcat4",
      name: "ext_cat4_cd",
      label: "準拠:",
      placeholder: "",
      ariaLabel: "Compliance",
      optionKey: { key: "han_cd", value: "han_name" },
    },
    {
      as: "select",
      controlId: "extcat5",
      name: "ext_cat5_cd",
      label: "学年:",
      placeholder: "",
      ariaLabel: "Grade",
      optionKey: { key: "han_cd", value: "han_name" },
    },
    {
      type: "checkbox",
      controlId: "hin_attr_cd",
      name: "hin_attr_cd",
      label: "お気に入り",
      placeholder: "",
    },
  ];
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  const search_params = new URL(request.url).searchParams;

  return defer({
    data: getHinList(search_params),
    searchParams: Object.fromEntries(search_params.entries()),
    forms: await getForms(),
    searchies: getHinCond(),
    message: "商品案内",
  });
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

/**
 *
 * @returns
 */
export function HinIndexRoute(): JSX.Element {
  return <HinIndexPage />;
}

HinIndexRoute.loader = clientLoader;
HinIndexRoute.action = clientAction;
