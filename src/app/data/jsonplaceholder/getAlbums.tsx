export type Album = {
	userId: number;
	id: number;
	title: string;
};

export async function getAlbums(searchParams: URLSearchParams) {
	const apiUrl = import.meta.env.VITE_TEST_API_URL;
	const userId = searchParams.get("userId") || "";
	// const p_id = title ? `/${encodeURIComponent(title)}` : "";
	const params = userId ? `?userId=${encodeURIComponent(userId)}` : "";
	const url = `${apiUrl}/albums${params}`;
	// const p_title = title ? `?title=${encodeURIComponent(title)}` : "";
	// const url = `${apiUrl}/albums${p_title}`;
	const res = await fetch(url);
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
