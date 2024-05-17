import { handleResponse } from "../../libs/libs.ts";
import { authProvider } from "../../provides/auth.ts";

const apiUrl = import.meta.env.VITE_APP_API_ADDRESS;

/**
 * Album
 */
export type Album = {
	userId: number;
	id: number;
	title: string;
};

/**
 *
 * @param searchParams
 * @returns
 */
export async function getMypage(searchParams: URLSearchParams): Promise<[]> {
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
			tok_cd: authProvider.usercd,
			token_id: authProvider.token_id,
			limit: 10,
			...params_entry,
		}),
	};
	const res = await fetch(url, param);
	const data = await handleResponse(res);

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
			tok_cd: "00030", // TODO
			token_id: "37b541d6cde030b8a88f0ad64a13b463", // TODO
			den_no: den_no,
		}),
	};
	const res = await fetch(url, param);
	const data = await handleResponse(res);

	return data.results;
}
