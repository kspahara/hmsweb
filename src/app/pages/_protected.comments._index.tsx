import { Link, useLoaderData } from "react-router-dom";
import { Comment } from "../data/jsonplaceholder/getComments";

export function ProtectedCommentsPage() {
	const { data } = useLoaderData() as { data: Comment[] };

	return (
		<>
			<section>
				<h2>ProtectedCommentsPage</h2>
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
		</>
	);
}
