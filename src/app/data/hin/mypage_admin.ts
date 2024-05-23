import { handleResponse } from "../../libs/libs.ts";
import { authProvider } from "../../provides/auth.ts";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 *
 * @param searchParams
 * @returns
 */
export async function getMypageAdmin(searchParams: URLSearchParams): Promise<[]> {
  const params_entry = Object.fromEntries(searchParams.entries());
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
      limit: params_entry.limit,
      // ...params_entry,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results;
}
