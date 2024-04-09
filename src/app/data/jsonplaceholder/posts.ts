import { handleResponse } from "../../libs/libs";

const apiUrl = import.meta.env.VITE_TEST_API_URL;

export type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

/**
 *
 * @returns
 */
export async function getPosts(): Promise<Post[]> {
	const url = `${apiUrl}/posts`;
	const res = await fetch(url);
	const data = await handleResponse(res);
	return data;
}
