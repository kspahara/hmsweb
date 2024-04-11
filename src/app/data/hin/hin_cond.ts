import { handleResponse } from "../../libs/libs";

const apiUrl = import.meta.env.VITE_API_URL;

type HinCond = {
	han_cd: string;
	han_name: string;
};

export type HinCondList = {
	results: HinCond[];
};

export async function getHinCond() {
	const url = `${apiUrl}/get-search-hin-cond.php`;
	const param: RequestInit = {
		method: "POST",
		mode: "cors",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	};
	const res = await fetch(url, param);
	const data = await handleResponse(res);

	return data.results;
}
