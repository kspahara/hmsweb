import { LoaderFunctionArgs, defer } from "react-router-dom";
// import { getHinDetail } from "../../data/hin/hin.ts";
// import { FormType } from "../../components/createForm.tsx";
import { GetHacyuzanMei } from "../../data/nyusyuko/hacyuzan.ts";
import { ProtectedNyusyukoDenPage } from "../../pages/nyusyuko/_protected.nyusyuko._index._den_no.tsx";
// import { ProtectedNyusyukoDenPage } from "../../pages/nyusyuko/_protected.nyusyuko._index._den_no.tsx";

// 抽出条件は使わないためコメントアウト
// const getForms = async (): Promise<FormType[]> => {
//   return [
//     {
//       type: "text",
//       controlId: "jan_cd",
//       name: "jan_cd",
//       label: "JANCODE",
//       placeholder: "JANCODE",
//     },

//     {
//       type: "text",
//       controlId: "hin_cd",
//       name: "hin_cd",
//       label: "品番",
//       placeholder: "品番",
//     },
//   ];
// };


const getSearchies = () => {
  return {
    // prc_sts: [
    //   { han_cd: "10", han_name: "進行中" },
    //   { han_cd: "99", han_name: "完了" },
    // ],
  };
};

const clientLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const search_params = new URL(request.url).searchParams;

  // console.log("rootden", params.den_no);

  return defer({
    // data: await GetHacyuzanMei(params.den_no,search_params),
    data:await GetHacyuzanMei(params.den_no,search_params),
    // dataS: GetHacyuzanMei(params.den_no,search_params),
    searchParams: Object.fromEntries(search_params.entries()),
    // forms: await getForms(),
    searchies: getSearchies(),
    message: "明細一覧画面",
  });
};

// const handle = {
//   crumb: (match: Match<{ results: { den_no: string }[] }>): JSX.Element => (
//     <CrumbItem
//       props={{
//         linkProps: { to: `${match.pathname}` },
//         active: getLocationPath() === match.pathname,
//       }}
//       label={<>{match.data.data.results[0].den_no}</>}
//     />
//   ),
// };

/**
 * HinDetailRoute
 * @returns
 */
export function ProtectedNyusyukoDenRoute(): JSX.Element {
  return <ProtectedNyusyukoDenPage />;
}

ProtectedNyusyukoDenRoute.loader = clientLoader;
