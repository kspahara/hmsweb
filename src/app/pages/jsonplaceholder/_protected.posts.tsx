import { useLoaderData } from "react-router-dom";
import { Post } from "../../data/jsonplaceholder/posts";

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
