export type Comment = {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
};

export async function getComments(id?: string | undefined): Promise<Comment[] | Comment> {
	const apiUrl = import.meta.env.VITE_TEST_API_URL;
	const p_id = id ? `/${encodeURIComponent(id)}` : "";
	const url = `${apiUrl}/comments${p_id}`;
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
