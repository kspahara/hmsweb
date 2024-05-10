import { handleResponse } from "../../libs/libs";

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

export async function getAuthUser(username: User["username"]): Promise<User[]> {
	const p_username = username ? `?username=${encodeURIComponent(username)}` : "";
	const url = `${apiUrl}/users${p_username}`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}

export async function getUserDetailCond(): Promise<User[]> {
	const url = `${apiUrl}/users`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}

export async function getUsersCond(): Promise<{ userId: User[] }> {
	const url = `${apiUrl}/users`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return { userId: data };
}

export async function getUsers(): Promise<User[]> {
	const url = `${apiUrl}/users`;
	const res = await fetch(url);
	const data = await handleResponse(res);

	return data;
}
