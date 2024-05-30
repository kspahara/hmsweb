import { handleResponse } from "../../libs/libs.ts";
import { authProvider } from "../../provides/auth.ts";

const apiUrl = import.meta.env.VITE_API_URL;

export type Hin = {
  atch_filename: string;
  atch_flg: string;
  atch_image: string;
  biko1: string;
  cat_cd: string;
  density: string;
  disc_mode: string;
  disc_per: string;
  han_name: string;
  hin_cd: string | undefined;
  hin_nm: string;
  hosoku1: string;
  htanka: string;
  kazei_tanka: string;
  nuki_tanka: string;
  size_cd: string;
  tanka: string;
  uchi_tanka: string;
  zei_kbn: string;
  zei_rate: string;
  hin_attr_cd: string;
};

export type HinList = {
  results: Hin[];
};

/**
 *
 * @param searchParams
 * @returns
 */
export async function getHinList(searchParams: URLSearchParams): Promise<HinList> {
  const params_entry = Object.fromEntries(searchParams.entries());
  const url = `${apiUrl}/get-search-tok_hin.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tok_cd: authProvider.tok_cd,
      token_id: authProvider.token_id,
      login_id: authProvider.user_cd,
      ...params_entry,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results;
}

/**
 *
 * @param p_hin_cd
 * @returns
 */
export async function getHinDetail(p_hin_cd: Hin["hin_cd"]): Promise<HinList> {
  const url = `${apiUrl}/get-search-tok_hin.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tok_cd: authProvider.tok_cd,
      token_id: authProvider.token_id,
      hin_cd: p_hin_cd,
      login_id: authProvider.user_cd,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data;
}

/**
 *
 * @param
 * @returns
 */
export async function updateHinFavorite(formData: FormData) {
  const url = `${apiUrl}/entry-tok-hin-attr.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tok_cd: authProvider.tok_cd,
      token_id: authProvider.token_id,
      hin_cd: formData.get("hin_cd"),
      hin_attr_cd: "1",
      login_id: authProvider.user_cd,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data;
}

/**
 *
 * @param
 * @returns
 */
export async function deleteHinFavorite(formData: FormData) {
  const url = `${apiUrl}/delete-tok-hin-attr.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tok_cd: authProvider.tok_cd,
      token_id: authProvider.token_id,
      hin_cd: formData.get("hin_cd"),
      hin_attr_cd: "1",
      login_id: authProvider.user_cd,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data;
}

/**
 *
 * @param
 * @returns
 */
export async function updateHinEntryCart(formData: FormData) {
  const url = `${apiUrl}/entry-cart.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      s_id: authProvider.session_id,
      tok_cd: authProvider.tok_cd,
      token_id: authProvider.token_id,
      hin_cd: formData.get("hin_cd"),
      suryo: formData.get("suryo"),
      login_id: authProvider.user_cd,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data;
}

/**
 *
 * @param searchParams
 * @returns
 */
export async function getCartCount() {
  const url = `${apiUrl}/get-cart.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tok_cd: authProvider.tok_cd,
      token_id: authProvider.token_id,
      login_id: authProvider.user_cd,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results;
}
