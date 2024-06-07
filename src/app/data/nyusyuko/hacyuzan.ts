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
      // nyuka_yotei_ymd: "", // TODO
      // prc_sts: "", // TODO
      ...params_entry,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results.hacyuzan_list;
}

export type HacyuzanListsM = {
  row_cnt: string;
  hacyu_su_s: string;
  den_no: string | undefined;
  row_no: string;
  hin_cd: string;
  hin_nm: string;
  hacyu_su: string;
  jan_cd: string;
  sir_nm: string;
  nyuka_yotei_ymd: string;
};

export type HacyuzanDataM = {
  dataM: HacyuzanListsM[];
  dataS: HacyuzanListsM[];
  // dataS: HacyuzanListsM[];
};

export async function GetHacyuzanMei(
  p_den_no: HacyuzanListsM["den_no"],
  searchParams: URLSearchParams
): Promise<HacyuzanDataM> {
  const url = `${apiUrl}/get-search-hacyuzan-mei.php`;
  const params_entry = Object.fromEntries(searchParams.entries());

  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      den_no: p_den_no,
      ...params_entry,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  const dataM = data.results.hacyuzan_lists_mi;
  const dataS = data.results.hacyuzan_lists_sumi;

  return { dataM, dataS };
  // return data ;
}

export type KenpinHin = {
  den_no: string | undefined;
  row_no?: string;
  hin_cd?: string;
  hin_nm?: string;
  jan_cd?: string;
  hacyu_su?: string;
  // t_sir_m?: InfoMhin; // もしくは適切な型を指定する
};

export async function GetSearchSireKenpinHin(
  p_den_no: KenpinHin["den_no"],
  p_jan_cd: KenpinHin["jan_cd"],
  // searchParams: URLSearchParams
) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const target_url = `${apiUrl}/get-search-sire-kenpin-hin-info.php`;
  // const params_entry = Object.fromEntries(searchParams.entries());


  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      den_no: p_den_no,
      jan_cd: p_jan_cd,
      // ...params_entry,
    }),
  };

  const res = await fetch(target_url, param);
  const responseData = await res.json();

  const t_sir_m = responseData.results.info_mhin;
  // console.log(t_sir_m);
  return { t_sir_m };
}
