/**
 * Album
 */
export type Album = {
	userId: number;
	id: number;
	title: string;
	[key: string]: number | string;
};

/**
 *
 * @param searchParams
 * @returns
 */
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

/**
 *
 * @param id
 * @returns
 */
export async function getAlbumDetail(id?: string | undefined): Promise<Album[] | Album> {
	const apiUrl = import.meta.env.VITE_TEST_API_URL;
	const p_id = id ? `/${encodeURIComponent(id)}` : "";
	const url = `${apiUrl}/albums${p_id}`;
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
