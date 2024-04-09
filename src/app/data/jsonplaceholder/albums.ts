import { createQueryParams, handleResponse } from "../../libs/libs";

const apiUrl = import.meta.env.VITE_TEST_API_URL;

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
export async function getAlbums(searchParams: URLSearchParams): Promise<Album[]> {
	const params = Object.fromEntries(searchParams.entries());
	const query = await createQueryParams(params);
	const url = `${apiUrl}/albums?${query}`;
	const res = await fetch(url);
	const data = await handleResponse(res);
	return data;
}

/**
 * cleateAlbum
 * @param params
 * @returns
 */
export async function cleateAlbum(params: { id: number; title: string }): Promise<Album> {
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
	const data = await handleResponse(res);

	return data;
}

/**
 * updateAlbum
 * @param params
 * @returns
 */
export async function updateAlbum(params: { id: string | undefined; title: string | null; userId: string | null }): Promise<Album> {
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
	const data = await handleResponse(res);

	return data;
}

/**
 *
 * @param id
 * @returns
 */
export async function getAlbumDetail(id?: string): Promise<Album> {
	const p_id = id ? `/${encodeURIComponent(id)}` : undefined;
	const url = `${apiUrl}/albums${p_id}`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}
