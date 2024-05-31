import { LoaderFunctionArgs } from "react-router-dom";
import { CrumbItem, Match } from "../../components/breadcrumbs.tsx";
import { getHinDetail } from "../../data/hin/hin.ts";
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
HinDetailRoute.handle = handle;
