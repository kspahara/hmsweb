import { createQueryParams, handleResponse } from "../../libs/libs";

const apiUrl = import.meta.env.VITE_TEST_API_URL;

export type Comment = {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
};

/**
 *
 * @param searchParams
 * @returns
 */
export async function getComments(searchParams: URLSearchParams): Promise<Comment[]> {
	const params = Object.fromEntries(searchParams.entries());
	const query = await createQueryParams(params);
	const url = `${apiUrl}/comments?${query}`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	// id title に変更
	return data.map((item: Comment) => ({
		id: item.id,
		title: item.name,
	}));
}

/**
 *
 * @param id
 * @returns
 */
export async function getCommentsDetail(id: string): Promise<Comment> {
	const url = `${apiUrl}/comments/${encodeURIComponent(id)}`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}
