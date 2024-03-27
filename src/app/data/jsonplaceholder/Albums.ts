/**
 * Album
 */
export type Album = {
	userId: number;
	id: number;
	title: string;
};

/**
 * cleateAlbum
 * @param params
 * @returns
 */
export async function cleateAlbum(params: { id: number; title: string }): Promise<Album> {
	const apiUrl = import.meta.env.VITE_TEST_API_URL;
	const url = `${apiUrl}/albums`;
	const param = {
		method: "POST",
		headers: {
			"Content-Type": "application/json, charset=utf-8",
		},
		body: JSON.stringify({
			userId: params.id,
			title: params.title,
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

/**
 * updateAlbum
 * @param params
 * @returns
 */
export async function updateAlbum(params: { id: string | undefined; title: string | null; userId: string | null }): Promise<Album> {
	const apiUrl = import.meta.env.VITE_TEST_API_URL;
	const url = `${apiUrl}/albums/${params.id}`;
	console.log("url", url);
	const param = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json, charset=utf-8",
		},
		body: JSON.stringify({
			id: params.id,
			title: params.title,
			userId: params.userId,
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
