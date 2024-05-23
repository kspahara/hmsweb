import { handleResponse } from "../../libs/libs.ts";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 *
 * @param
 * @returns
 */
export async function getLoginTokui(p_email: string, p_password: string) {
  const url = `${apiUrl}/login-tokui.php`;
  const param: RequestInit = {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: p_email,
      user_pass: p_password,
    }),
  };
  const res = await fetch(url, param);
  const data = await handleResponse(res);

  return data.results;
}
