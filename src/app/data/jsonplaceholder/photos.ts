import { handleResponse } from "../../libs/libs.ts";

const apiUrl = import.meta.env.VITE_TEST_API_URL;

export type Photo = {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
};

/**
 *
 * @returns
 */
export async function getPhotos(): Promise<Photo[]> {
	const url = `${apiUrl}/photos`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}
