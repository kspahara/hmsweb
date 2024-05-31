import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getHinCond } from "../../data/hin/hin_cond.ts";
import { FormType } from "../../components/createForm.tsx";

import { getHacyuzan } from "../../data/nyusyuko/hacyuzan.ts";
import { ProtectedNyusyukoPage } from "../../pages/nyusyuko/_protected.nyusyuko._index.tsx";

const getForms = async (): Promise<FormType[]> => {
  return [
    {
      type: "date",
      controlId: "nyuka_yotei_ymd",
      name: "nyuka_yotei_ymd",
      label: "入荷予定日:",
      placeholder: "入荷予定日",
    },
    {
      as: "select",
      controlId: "prc_sts",
      name: "prc_sts",
      label: "進行状態:",
      placeholder: "進行状態",
      ariaLabel: "進行状態",
      optionKey: { key: "han_cd", value: "han_name" },
    },
  ];
};
const getSearchies = () => {
  return {
    prc_sts: [
      { han_cd: "1", han_name: "進行中" },
      { han_cd: "2", han_name: "完了" },
    ],
    prc_sts2: [
      { han_cd: "1", han_name: "進行中" },
      { han_cd: "2", han_name: "完了" },
    ],
  };
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  const search_params = new URL(request.url).searchParams;

  console.log("getSearchies()", getSearchies());
  console.log("getHinCond()", await getHinCond());

  return defer({
    data: getHacyuzan(search_params),
    searchParams: Object.fromEntries(search_params.entries()),
    forms: await getForms(),
    searchies: getSearchies(),
    message: "入荷一覧画面",
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
