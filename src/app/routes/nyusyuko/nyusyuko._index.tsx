import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getHinCond } from "../../data/hin/hin_cond.ts";
import { FormType } from "../../components/createForm.tsx";

import { getHacyuzan } from "../../data/nyusyuko/getHacyuzan.ts";
import { ProtectedNyusyukoPage } from "../../pages/nyusyuko/nyusyuko._index.tsx";

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
  ];
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  const search_params = new URL(request.url).searchParams;
  // const searchParams = Object.fromEntries(
  // 	Array.from(search_params.entries()).map(([key, value]) => {
  // 		return [key, value ?? ""];
  // 	})
  // );

  return defer({
    // data: getHinList(search_params),
    data: getHacyuzan(search_params),

    searchParams: Object.fromEntries(search_params.entries()),
    forms: await getForms(),
    searchies: getHinCond(),
    message: "Hin",
  });
};

/**
 *
 * @returns
 */
export function ProtectedNyusyukoRoute(): JSX.Element {
  return <ProtectedNyusyukoPage />;
}

ProtectedNyusyukoRoute.loader = clientLoader;