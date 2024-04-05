export async function getHinList(searchParams: URLSearchParams) {
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
			tok_cd: searchParams.get("tok_cd"),
			token_id: searchParams.get("token_id"),
			hin_cd: searchParams.get("hin_cd"),
			cat_cd: searchParams.get("cat_cd"),
			ext_cat1_cd: searchParams.get("ext_cat1_cd"),
			ext_cat2_cd: searchParams.get("ext_cat2_cd"),
			ext_cat3_cd: searchParams.get("ext_cat3_cd"),
			ext_cat4_cd: searchParams.get("ext_cat4_cd"),
			ext_cat5_cd: searchParams.get("ext_cat5_cd"),
			keyword: searchParams.get("keyword"),
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
