import { LoaderFunctionArgs, defer } from "react-router-dom";
import { FormType } from "../../components/createForm.tsx";
import { getMypage } from "../../data/hin/mypage.ts";
import { parseInttoStr, formatDateYmd } from "../../libs/libs.ts";
import { ProtectedMypagePage } from "../../pages/hin/_protected.mypage._index.tsx";
import { authProvider } from "../../provides/auth.ts";

const route_name = "ProtectedMypageRoute";

const getForms = async (): Promise<FormType[]> => {
  return [
    {
      type: "date",
      controlId: "ymd_fr",
      name: "ymd_fr",
      label: "処理日:",
      placeholder: "処理日",
    },
  ];
};

export type Field = {
  label: string;
  key: string;
  format?: (value: string) => string;
  labelClass?: string;
  className?: string;
};

type Fields = {
  header: Field[];
  detail: Field[];
};

const getFields = async (): Promise<Fields> => {
  const fields = {
    header: [
      { label: "処理日:", key: "syori_ymd", format: (value: string) => formatDateYmd(value, "/") },
      { label: "伝票番号:", key: "den_no" },
      { label: "取引種別:", key: "tor_kbn" },
    ],
    detail: [
      { label: "商品:", key: "hin_cd" },
      { label: "", key: "hin_nm" },
      { label: "数量:", key: "suryo", format: (value: string) => `${parseInttoStr(value)}`, labelClass: "text-end", className: "text-end" },
      { label: "単価:", key: "tanka", format: (value: string) => `¥${parseInttoStr(value)}`, labelClass: "text-end", className: "text-end" },
      { label: "金額:", key: "kingaku", format: (value: string) => `¥${parseInttoStr(value)}`, labelClass: "text-end", className: "text-end" },
    ],
  };

  return {
    header: fields.header,
    detail: fields.detail,
  };
};

const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  if (!authProvider.isAuthenticated) return console.log(`${route_name} !isAuth false`), false;

  const search_params = new URL(request.url).searchParams;
  const [forms, fields] = await Promise.all([getForms(), getFields()]);

  return defer({
    data: getMypage(search_params),
    searchParams: Object.fromEntries(search_params.entries()),
    forms,
    searchies: [],
    message: route_name,
    fields,
  });
};

export function ProtectedMypageRoute(): JSX.Element {
  return <ProtectedMypagePage />;
}

ProtectedMypageRoute.loader = clientLoader;
