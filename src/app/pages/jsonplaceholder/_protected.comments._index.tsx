import { Link, useLoaderData } from "react-router-dom";
import { Comment } from "../../data/jsonplaceholder/comments.ts";

export function ProtectedCommentsPage() {
	const { data } = useLoaderData() as { data: Comment[] };

	return (
		<>
			<section id={"protexted-comments-page"}>
				<header>
					<h1 className={"h2"}>ProtectedCommentsPage</h1>
					<p>Protected Comments</p>
				</header>
				<hr />
				<section>
					<h2 className={"h3"}>ProtectedCommentsPage</h2>
					<ul>
						{data.map((comment) => (
							<li key={comment.id}>
								<Link to={`/comments/${comment.id}`}>
									{comment.id}:{comment.name}
								</Link>
							</li>
						))}
					</ul>
				</section>
			</section>
		</>
	);
}
