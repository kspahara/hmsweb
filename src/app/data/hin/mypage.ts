import { handleResponse } from "../../libs/libs.ts";
import { authProvider } from "../../provides/auth.ts";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 *
 * @param searchParams
 * @returns
 */
export async function getMypage(searchParams: URLSearchParams): Promise<[]> {
  const params_entry = Object.fromEntries(searchParams.entries());
  // $route = 'get-tokui-tor-rireki.php';
  // $url = BASE_URL . "{$route}";
  // $data = json_encode([
  //     'login_id' => '07824',
  //     'tok_cd' => '07824',
  //     'token_id' => 'TOK:0e632b95a47359a9ba2fa844b59599eb',
  //     'include_detail' => '1',
  //     'limit' => '10',
  // ]);
  const url = `${apiUrl}/get-tokui-tor-rireki.php`;
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
      ymd_fr: params_entry.ymd_fr ? params_entry.ymd_fr.replace(/-/g, "") : "", //TODO
      login_id: authProvider.user_cd,
      limit: params_entry.limit,
      include_detail: "1",
      // ...params_entry,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  if (data.errors[0]) {
    alert(data.errors[0].errorMessage);
    throw new Error(data.errors[0].errorMessage);
  }

  return data.results;
}

/**
 *
 * @param id
 * @returns
 */
export async function getDenDetail(den_no: string): Promise<[]> {
  const url = `${apiUrl}/get-uri.php`;
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
      den_no: den_no,
      login_id: authProvider.user_cd,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results;
}
