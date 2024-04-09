import { handleResponse } from "../../libs/libs";

const apiUrl = import.meta.env.VITE_TEST_API_URL;

export type Comment = {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
	[key: string]: number | string;
};

/**
 *
 * @param id
 * @returns
 */
export async function getComments(id?: string | undefined): Promise<Comment[] | Comment> {
	const p_id = id ? `/${encodeURIComponent(id)}` : "";
	const url = `${apiUrl}/comments${p_id}`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}
