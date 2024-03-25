export async function getTodos() {
	const apiUrl = import.meta.env.VITE_TEST_API_URL;
	const url = `${apiUrl}/todos`;
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
