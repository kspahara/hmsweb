export async function getHinDetail(p_hin_cd: string | undefined) {
	const apiUrl = import.meta.env.VITE_API_URL;
	const url = `${apiUrl}/get-search-tok_hin.php`;
	const param: RequestInit = {
		method: "POST",
		mode: "cors",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			hin_cd: p_hin_cd,
		}),
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
