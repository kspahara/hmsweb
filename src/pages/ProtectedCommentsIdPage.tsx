import { useLoaderData, useNavigate } from "react-router-dom";
import { Comment } from "../data/jsonplaceholder/getComments";

export function ProtectedCommentsIdPage() {
	const { data } = useLoaderData() as { data: Comment };
	const navigate = useNavigate();

	return (
		<>
			<section>
				<h3>ProtectedCommentsIdPage</h3>
				<button
					type="button"
					onClick={() => {
						navigate(-1);
					}}
				>
					Back
				</button>
				<div>
					<h4>{data.name}</h4>
					<p>{data.body}</p>
					<p>{data.email}</p>
				</div>
			</section>
		</>
	);
}
