import { handleResponse } from "../../libs/libs.ts";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = import.meta.env.VITE_API_URL_M;

type HacyuzanLists = {
  row_cnt: string;
  hacyu_su_s: string;
  den_no: string;
  row_no: string;
  hin_cd: string | undefined;
  hin_nm: string;
  hacyu_su: string;
  jan_cd: string;
  sir_nm: string;
  nyuka_yotei_ymd: string;
  den_cnt: string;

  //一旦m_hin引き継ぎ
  atch_filename: string;
  atch_flg: string;
  atch_image: string;
  biko1: string;
  cat_cd: string;
  density: string;
  disc_mode: string;
  disc_per: string;
  han_name: string;
  hosoku1: string;
  htanka: string;
  kazei_tanka: string;
  nuki_tanka: string;
  size_cd: string;
  tanka: string;
  uchi_tanka: string;
  zei_kbn: string;
  zei_rate: string;
};

export type HacyuzanData = {
  results: {
    hacyuzan_list: HacyuzanLists[];
  };
};

export async function getHacyuzan(
  searchParams: URLSearchParams
): Promise<HacyuzanData> {
  const params_entry = Object.fromEntries(searchParams.entries());
  const url = `${apiUrl}/get-search-hacyuzan.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nyuka_yotei_ymd: "", // TODO
      prc_sts: "", // TODO
      ...params_entry,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results.hacyuzan_list;
}
