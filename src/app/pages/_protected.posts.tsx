import { useLoaderData } from "react-router-dom";

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export function ProtectedPostsPage() {
	const { data } = useLoaderData() as { data: Post[] };

	return (
		<>
			<section>
				<h2>ProtectedPostsPage</h2>
				<ul>
					{data.map((post) => (
						<li key={post.id}>
							<div>
								{post.id}:{post.title}
							</div>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
