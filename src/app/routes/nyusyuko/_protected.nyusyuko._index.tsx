import { LoaderFunctionArgs, defer } from "react-router-dom";
import { getHinCond } from "../../data/hin/hin_cond.ts";
import { FormType } from "../../components/createForm.tsx";

import { getHacyuzan } from "../../data/nyusyuko/getHacyuzan.ts";
import { ProtectedNyusyukoPage } from "../../pages/nyusyuko/_protected.nyusyuko._index.tsx";

const getForms = async (): Promise<FormType[]> => {
  return [
    {
      type: "text",
      controlId: "nyuka_yotei_ymd",
      name: "nyuka_yotei_ymd",
      label: "予定",
      placeholder: "予定",
    },
    {
      type: "text",
      controlId: "prc_sts",
      name: "prc_sts",
      label: "進行状態",
      placeholder: "進行状態",
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
