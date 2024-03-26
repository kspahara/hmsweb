export type Album = {
	userId: number;
	id: number;
	title: string;
};

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
