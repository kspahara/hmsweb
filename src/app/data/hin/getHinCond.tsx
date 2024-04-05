export type HinCond = {
	han_cd: string;
	han_name: string;
};

export async function getHinCond() {
	const apiUrl = import.meta.env.VITE_API_URL;
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
	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await res.json();
	if (!data) {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		});
	}
	return data;
}
