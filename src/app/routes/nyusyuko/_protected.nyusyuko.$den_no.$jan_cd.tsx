import { LoaderFunctionArgs, defer } from "react-router-dom";
// import { getHinDetail } from "../../data/hin/hin.ts";
// import { FormType } from "../../components/createForm.tsx";
// import {
//   // GetHacyuzanMei,
//   GetSearchSireKenpinHin,
// } from "../../data/nyusyuko/hacyuzan.ts";
import { ProtectedNyusyukoDenJANPage } from "../../pages/nyusyuko/_protected.nyusyuko.$den_no.$jan_cd.tsx";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { getLocationPath } from "../../libs/libs.ts";
import { GetSearchSireKenpinHin } from "../../data/nyusyuko/hacyuzan.ts";

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

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  const search_params = new URL(request.url).searchParams;

  console.log();

  return defer({
    data: await GetSearchSireKenpinHin(
      "49402217",
      "350-64326-1"
    ),
    searchParams: Object.fromEntries(search_params.entries()),
    searchies: getSearchies(),
    message: "明細詳細画面",
  });
};

const handle = {
  crumb: (match: Match<{ dataM: { den_no: string }[] }>): JSX.Element => {
    console.log(match);
    return (
      // <CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>{match.data.data.den_no}</>} />
      <CrumbItem props={{ linkProps: { to: `${match.pathname}` }, active: getLocationPath() === match.pathname }} label={<>aaaa</>} />
      // <CrumbItem
      //   props={{
      //     linkProps: { to: `${match.pathname}` },
      //     active: getLocationPath() === match.pathname,
      //   }}
      //   label={<>{match.data.data.dataM[0].den_no}</>}
      // />
    );
  },
};

/**
 * HinDetailRoute
 * @returns
 */
export function ProtectedNyusyukoDenJanRoute(): JSX.Element {
  return <ProtectedNyusyukoDenJANPage />;
}

ProtectedNyusyukoDenJanRoute.loader = clientLoader;
ProtectedNyusyukoDenJanRoute.handle = handle;
