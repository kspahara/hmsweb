import { handleResponse } from "../../libs/libs.ts";
import { authProvider } from "../../provides/auth.ts";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 *
 * @param
 * @returns
 */
export async function getCart() {
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
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results;
}

/**
 *
 * @param
 * @returns
 */
export async function deleteCart(formData: FormData) {
  const url = `${apiUrl}/delete-cart.php`;
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
      row_no: formData.get("row_no"),
      login_id: authProvider.tok_cd,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results;
}
