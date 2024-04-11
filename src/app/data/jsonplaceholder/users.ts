import { createQueryParams, handleResponse } from "../../libs/libs";

const apiUrl = import.meta.env.VITE_TEST_API_URL;

export type User = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
};

export async function getAuthUser(username: string) {
	const p_username = username ? `?username=${encodeURIComponent(username)}` : "";
	const url = `${apiUrl}/users${p_username}`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}

export async function getUsers() {
	const url = `${apiUrl}/users`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}

/**
 *
 * @param searchParams
 * @returns
 */
export async function getUser(searchParams: URLSearchParams) {
	const params = Object.fromEntries(searchParams.entries());
	const query = await createQueryParams(params);
	const url = `${apiUrl}/users?${query}`;
	// const p_username = username ? `?username=${encodeURIComponent(username)}` : "";
	// const url = `${apiUrl}/users${p_username}`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}
